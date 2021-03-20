
export interface IData {
  id?: number;
  userId: number;
  date: string;
  weight: number;
  comment: string;
  animalId: string;
}

export interface IAddDataRequest {
  date: string;
  weight: number;
  comment: string;
  animalId: string;
}





