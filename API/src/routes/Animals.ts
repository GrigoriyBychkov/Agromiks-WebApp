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
const animalDao = new AnimalDao();


router.get('/animal/:id', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  const params = req.params;
  const user: IUser = req.user;

  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'Ошибка доступа'});
  }
  const animal = await animalDao.getById(params.id);

  return res.status(OK).json(animal);
});

router.post('/add', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  const request: IAddAnimalRequest = req.body;

  const user: IUser = req.user;
  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'Ошибка доступа'});
  }
  const animal = await animalDao.create(request, user);

  return res.status(OK).json(animal);
});

router.post('/addData', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');

  const user: IUser = req.user;
  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'Ошибка доступа'});
  }
  const request: IAddDataRequest = req.body;
  const animal = await animalDao.getById(request.animalId);
  let data;

  if (animal) {
    data = await animalDao.addData(request, user);
  } else {
    return res.status(NOT_FOUND).json({error: 'Животное с таким номером не найдено'});
  }

  return res.status(OK).json(data);
});

// router.post('/removeData/:id', async (req: Request | any, res: Response) => {
//   res.header('Access-Control-Allow-Origin', '*');
//
//   const user: IUser = req.user;
//   if (!user) {
//     return res.status(UNAUTHORIZED).json({error: 'Ошибка доступа'});
//   }
//   const request: IAddDataRequest = req.body;
//   const animal = await animalDao.getById(request.animalId);
//   let data;
//
//   if (animal) {
//     data = await animalDao.addData(request, user);
//   } else {
//     res.status(NOT_FOUND).json({error: 'Животное с таким номером не найдено'});
//   }
//
//   return res.status(OK).json(data);
// });

router.get('/list', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');

  const user: IUser = req.user;
  if (!user) {
    res.status(UNAUTHORIZED).json({error: 'invalid_token'});
  }
  const animals = await animalDao.getList(req.query, user);

  return res.status(OK).json(animals);
});

router.get('/countAnimals', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');

  const user: IUser = req.user;
  if (!user) {
    res.status(UNAUTHORIZED).json({error: 'invalid_token'});
  }
  const count = await animalDao.getCountAnimals(user);

  return res.status(OK).json(count);
});

router.get('/countLossAnimals', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');

  const user: IUser = req.user;
  if (!user) {
    res.status(UNAUTHORIZED).json({error: 'invalid_token'});
  }
  const count = await animalDao.getCountLossAnimals(user);

  return res.status(OK).json(count);
});


router.post('/updateAnimal/:id', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  // console.log('req body', req.body);

  const user: IUser = req.user;
  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'invalid_token'});
  }
  const animal = await animalDao.update(req.body);

  return res.status(OK).json(animal);
});

router.get('/getDataByAnimal/:id', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  // console.log('req body', req.body);

  const user: IUser = req.user;
  if (!user) {
    res.status(UNAUTHORIZED).json({error: 'invalid_token'});
  }
  const params = req.params;
  console.log('getData params', params);
  const data = await animalDao.getDataByAnimal(params.id);

  return res.status(OK).json(data);
});

router.get('/getDataById/:id', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  // console.log('req body', req.body);

  const user: IUser = req.user;
  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'invalid_token'});
  }
  const params = req.params;
  console.log('getData params', params);
  const data = await animalDao.getDataById(params.id);

  return res.status(OK).json(data);
});

router.post('/updateDataById/:id', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  // console.log('req body', req.body);

  const user: IUser = req.user;
  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'invalid_token'});
  }
  const params = req.params;
  console.log('getData params', params);
  const data = await animalDao.updateData(req.body, user);

  return res.status(OK).json(data);
});

router.get('/remove/:id', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  // console.log('req body', req.body);
  const params = req.params;
  console.log('remove params', params);

  const user: IUser = req.user;
  console.log('user', user);
  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'invalid_token'});
  }
  const animal = await animalDao.remove(params.id);

  return res.status(OK).json(animal);
});

router.get('/removeData/:id', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  // console.log('req body', req.body);
  const params = req.params;

  const user: IUser = req.user;
  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'invalid_token'});
  }
  const animal = await animalDao.removeData(params.id);

  return res.status(OK).json(animal);
});

router.post('/getDataReport', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  // console.log('req body', req.body);

  const user: IUser = req.user;
  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'invalid_token'});
  }

  const data = await animalDao.getDataReport(req.body, user);

  return res.status(OK).json(data);
});

// TODO: Get Animal by id +
// TODO: Update Animal +
// TODO: Remove Animal +

// TODO: Add Animal data +
// TODO: Update Animal data
// TODO: Remove Animal data +

export default router;
