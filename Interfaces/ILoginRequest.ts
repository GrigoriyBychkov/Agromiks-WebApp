import {IUser} from './IUser';

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ILoginResponse {
  user?: IUser;
  token?: string;
  error?: string;
}

