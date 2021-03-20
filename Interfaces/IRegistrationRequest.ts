import {IUser} from './IUser';

export interface IRegistrationRequest {
  companyName: string;
  confirmPassword: string;
  email: string;
  name: string;
  password: string;
  hash?: string;
}

export interface IRegistrationResponse {
  user?: IUser;
  token?: string;
  error?: string;
}

