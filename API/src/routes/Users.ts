import { Request, Response, Router } from 'express';
import {BAD_REQUEST, CREATED, OK, UNAUTHORIZED} from 'http-status-codes';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

import {ILoginRequest, ILoginResponse} from '../../../Interfaces/ILoginRequest';
import {IRegistrationRequest, IRegistrationResponse} from '../../../Interfaces/IRegistrationRequest';
import {IResetPasswordRequest} from '../../../Interfaces/IResetPasswordRequest';
import {SRVCONFIG} from '../../../serverConfig';
import {IUser} from '../../../Interfaces/IUser';
import UserDao from '../daos/User/UserDao';

// Init shared
const router = Router();
const userDao = new UserDao();


router.post('/login', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  const request: ILoginRequest = req.body;
  const user = await userDao.getByEmail(request.username);

  if (!user) {
    res.status(UNAUTHORIZED).json({error: 'incorrect_login'});
    return;
  }
  bcrypt.compare(request.password,  user.password, async (error, compRes) => {
    if (compRes) {
      user.password = undefined;
      const token = jwt.sign({ user }, SRVCONFIG.secret);
      const response: ILoginResponse = {user, token};
      res.status(OK).json(response);
    } else {
      res.status(UNAUTHORIZED).json({error: 'incorrect_login'});
    }
  });
});

router.post('/registration', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  const request: IRegistrationRequest = req.body;

  const user = await userDao.getByEmail(request.email);
  if (user) {
    res.status(BAD_REQUEST).json({error: 'Пользователь уже существует'});
    return;
  }
  bcrypt.hash(request.password, 10, async (error, hash) => {
    request.hash = hash;

    const addUser = await userDao.addUser(request);
    const addCompany = await userDao.addCompany(request, addUser.insertId);
    const newUser = await userDao.getById(addUser.insertId);
    newUser.companyId = addCompany.insertId;
    await userDao.updateUser(newUser);
    newUser.password = undefined;
    const token = jwt.sign({ user: newUser }, SRVCONFIG.secret);
    const response: IRegistrationResponse = {
      user: newUser,
      token
    };
    res.status(OK).json(response);
  });
});


router.post('/updateProfile', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');
  const request: IRegistrationRequest = req.body;

  const user: IUser = req.user;
  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'Ошибка доступа'});
  }
  const profile = await userDao.getById(user.id);

  profile.name = request.name;
  profile.email = request.email;
  if (request.password) {
    profile.password = bcrypt.hashSync(request.password, 10);
  }
  await userDao.updateUser(profile);

  const company = await userDao.getCompanyById(user.companyId);
  company.name = request.companyName;
  await userDao.updateCompany(company);

  res.status(OK).json(profile);
});

router.post('/dropPassword', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');

  const request: IResetPasswordRequest = req.body;

  const user = await userDao.getByEmail(request.username);

  if (user) {
    console.log(user);
    let password = '';

    const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=';
    for (let i = 0; i < 4; i++) {
      password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    console.log('new password', password);
    bcrypt.hash(password, 10, async (error, hash) => {
      req.query.password = hash;
      await userDao.dropPassword(request, user.id);

      const nodemailer = require('nodemailer');


      const transporter = nodemailer.createTransport(SRVCONFIG.email);

      const result = await transporter.sendMail({
        from: '\'Агромикс сброс пароля\' <agromiksdroppass@yandex.ru>',
        to: request.username,
        subject: 'Ваш новый пароль' ,
        text: 'Сообщение успешно отпавлено',
        html: 'Ваш новый пароль: ' + password + ' авторизируйтесь снова.'
      });

      console.log(result);
      user.password = undefined;
      // const token = jwt.sign({ user: user }, SRVCONFIG.secret);
      res.status(OK);
    });
  } else {
    res.status(UNAUTHORIZED).json({error: 'Пользователь не найден'});
  }
});

router.get('/profile', async (req: Request | any, res: Response) => {
  res.header('Access-Control-Allow-Origin', '*');

  const user: IUser = req.user;
  if (!user) {
    return res.status(UNAUTHORIZED).json({error: 'Ошибка доступа'});
  }
  const profile = await userDao.getById(user.id);

  profile.company = await userDao.getCompanyById(user.companyId);
  profile.password = undefined;

  return res.status(OK).json(profile);
});

// TODO: update user

export default router;
