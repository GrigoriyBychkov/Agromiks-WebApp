import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {ILoginRequest} from '../../../../../Interfaces/ILoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error = '';
  public form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    try {
      const user = this.userService.getUser();
      const token = this.userService.getToken();

      if (user && token) {
        this.router.navigate(['/dashboard']);
      }
    } catch (e) {

    }

  }

  async submit() {
    try {
      const request: ILoginRequest = {
        username: this.form.value.username,
        password: this.form.value.password,
      };
      const result = await this.userService.login(request).toPromise();
      console.log('result', result);
      if (result && result.user && result.token) {
        this.userService.setUser(result.user);
        this.userService.setToken(result.token);
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Логин или пароль введены не верно';
      }
    } catch (e) {
      this.error = 'Логин или пароль введены не верно';
    }
  }
}
