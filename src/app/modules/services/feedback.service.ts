import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {IAddAnimalRequest} from '../../../../Interfaces/IAddAnimalRequest';
import {Observable} from 'rxjs';
import {IAnimal} from '../../../../Interfaces/IAnimal';
import {environment} from '../../../environments/environment';
import {UserService} from './user.service';
import {ISendFeedback} from '../../../../Interfaces/ISendFeedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  public send(feedback: ISendFeedback): Observable<any> {
    return this.http.post<IAnimal>(environment.apiUrl + '/feedback/send',
      feedback, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.userService.getToken()
        })}
    );
  }
}
