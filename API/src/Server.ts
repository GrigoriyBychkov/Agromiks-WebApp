import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { Request, Response, NextFunction } from 'express';
import {BAD_REQUEST, UNAUTHORIZED} from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import logger from './shared/Logger';
import cors from 'cors';
import {SRVCONFIG} from '../../serverConfig';
const jwt = require('jsonwebtoken');

const app = express();



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({origin: '*'}));

// app.use((req, res, next) => {
//   const origins = [
//     'http://localhost:4200/',
//     'http://localhost:3000/'
//   ];
//
//   for (const origin of origins) {
//     console.log('origin', origin);
//     // res.header('Access-Control-Allow-Origin', 'http://localhost:4200/');
//   }
//   res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:4200/');
//
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Auth API errors
app.use((req: Request | any, res: Response, next: NextFunction) => {
  try {
    const decoded = jwt.verify(req.headers.authorization.replace('Bearer ', ''), SRVCONFIG.secret);
    req.user = decoded.user;
  } catch (e) {
  }
  next();
});

// Add APIs
app.use('/api', BaseRouter);

// Print API errors
app.use((err: Error, req: Request | any, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});


/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
const staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));

app.get('*', (req: Request | any, res: Response) => {
    res.sendFile('index.html', {root: viewsDir});
});

// Export express instance
export default app;
