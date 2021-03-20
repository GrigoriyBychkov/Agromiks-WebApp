import {IUser} from '../../../Interfaces/IUser';

export interface IRequest extends Request {
  user: IUser;
}
