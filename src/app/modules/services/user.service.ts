import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ILoginRequest, ILoginResponse} from '../../../../Interfaces/ILoginRequest';
import {IResetPasswordRequest, IResetPasswordResponse} from '../../../../Interfaces/IResetPasswordRequest';
import {IRegistrationRequest, IRegistrationResponse} from '../../../../Interfaces/IRegistrationRequest';
import {environment} from '../../../environments/environment';
import {IUser} from '../../../../Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) {}

  public setToken(token: string) {
    localStorage.token = token;
  }

  public setUser(user: IUser) {
    localStorage.user = JSON.stringify(user);
  }

  public getUser(): IUser {
    try {
      return JSON.parse(localStorage.user);
    } catch (e) {
      return null;
    }
  }

  public getToken(): string {
    return localStorage.token;
  }

  public logout() {
    localStorage.token = undefined;
    localStorage.user = undefined;
  }

  public getProfile(): Observable<IUser> {
    return this.http.get<IUser>(environment.apiUrl + '/users/profile', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getToken()
      })});
  }

  public login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(environment.apiUrl + '/users/login', request);
  }

  public registration(request: IRegistrationRequest): Observable<IRegistrationResponse> {
    return this.http.post<IRegistrationResponse>(environment.apiUrl + '/users/registration',
      request
    );
  }

  public updateProfile(request: IRegistrationRequest): Observable<IRegistrationResponse> {
    return this.http.post<IRegistrationResponse>(environment.apiUrl + '/users/updateProfile',
      request, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.getToken()
        })
    });
  }

  public dropPassword(request: IResetPasswordRequest): Observable<IResetPasswordResponse> {
    return this.http.post<IResetPasswordResponse>(environment.apiUrl + '/users/dropPassword',
      request
    );
  }

}
