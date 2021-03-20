import {IAnimal} from './IAnimal';
import {IData} from './IData';

export interface IGetDataReportRequest {
  type: string;
  from: string;
  to: string;
}

export interface IGetDataReportResponse {
  id: string;
  dateBirth: string;
  type: string;
  weight: number;
  date: string;
}
