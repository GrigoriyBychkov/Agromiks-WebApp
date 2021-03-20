import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {IAddAnimalRequest} from '../../../../Interfaces/IAddAnimalRequest';
import {IAnimal} from '../../../../Interfaces/IAnimal';
import {environment} from '../../../environments/environment';
import {UserService} from './user.service';
import {IData} from '../../../../Interfaces/IData';
import {IUpdateAnimalRequest} from '../../../../Interfaces/IUpdateAnimal';
import {IGetDataReportRequest, IGetDataReportResponse} from '../../../../Interfaces/IGetDataReportRequest';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) {}

  public add(request: IAddAnimalRequest): Observable<IAnimal> {
    return this.http.post<IAnimal>(environment.apiUrl + '/animals/add',
      request, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
      })}
    );
  }

  public getById(id: string): Observable<IAnimal> {
    return this.http.get<IAnimal>(environment.apiUrl + '/animals/animal/' + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
      })}
    );
  }

  public getCountAnimals(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/animals/countAnimals/',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
        })}
    );
  }

  public getCountLossAnimals(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/animals/countLossAnimals/',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
        })}
    );
  }

  public getList(offset = '0', limit = '1000'): Observable<IAnimal[]> {
    return this.http.get<IAnimal[]>(environment.apiUrl + '/animals/list', {
      params: {offset, limit},
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.userService.getToken()
    })}
    );
  }

  public addData(request: IAddAnimalRequest): Observable<IData> {
    return this.http.post<IData>(environment.apiUrl + '/animals/addData',
      request, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
        })}
    );
  }

  public getDataByAnimal(id: string): Observable<IData> {
    return this.http.get<IData>(environment.apiUrl + '/animals/getDataByAnimal/' + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
        })
      }
    );
  }

  public getDataById(id: string): Observable<IData> {
    return this.http.get<IData>(environment.apiUrl + '/animals/getDataById/' + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
        })
      }
    );
  }

  public updateAnimal(request: IUpdateAnimalRequest, id): Observable<IUpdateAnimalRequest> {
    return this.http.post<IUpdateAnimalRequest>(
      environment.apiUrl + '/animals/updateAnimal/' + id ,
      request,
      {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.userService.getToken()
      })}
    );
  }

  public updateData(request: IData, id): Observable<IData> {
    return this.http.post<IData>(
      environment.apiUrl + '/animals/updateDataById/' + id ,
      request,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
        })}
    );
  }

  public animal(id): Observable<IAnimal> {
    return this.http.get<IAnimal>(environment.apiUrl + '/animals/animal/:id',
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
        })}
    );
  }

  public removeAnimal(id): Observable<any> {
    return this.http.get(environment.apiUrl + '/animals/remove/' + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
        })}
    );
  }

  public removeData(id): Observable<any> {
    return this.http.get(environment.apiUrl + '/animals/removeData/' + id,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
        })}
    );
  }

  public getDataReport(request: IGetDataReportRequest): Observable<IGetDataReportResponse[]> {
    return this.http.post<IGetDataReportResponse[]>(environment.apiUrl + '/animals/getDataReport',
      request, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
        })}
    );
  }
}
