import {ICompany} from './ICompany';

export interface IUser {
  companyId: number;
  email: string;
  id: number;
  name: string;
  password?: string;
  company?: ICompany;
}
