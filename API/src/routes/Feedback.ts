import { Request, Response, Router } from 'express';
import {BAD_REQUEST, CREATED, NOT_FOUND, OK, UNAUTHORIZED} from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';
import AnimalDao from '../daos/Animal/AnimalDao';
import {ILoginRequest} from '../../../Interfaces/ILoginRequest';
import {IAddAnimalRequest} from '../../../Interfaces/IAddAnimalRequest';
import {SRVCONFIG} from '../../../serverConfig';
import {IUser} from '../../../Interfaces/IUser';
import {IRequest} from '../shared/IRequest';
import {IAddDataRequest} from '../../../Interfaces/IData';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Init shared
const router = Router();

router.post('/send', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  // console.log('req body', req.body);
  console.log('//reauest', req.body);

  const user: IUser = req.user;
  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'invalid_token'});
  }
  const nodemailer = require('nodemailer');
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  const mailOptions = {
    from: 'am@agromiks.ru',
    to: 'imansiberia@icloud.com, gby@gby.su',
    subject: req.body.company,
    text: req.body.text
  };

  transporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
      console.log(error);
      return res.status(BAD_REQUEST);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  return res.status(OK);
});



export default router;
