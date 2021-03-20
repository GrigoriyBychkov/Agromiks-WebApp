import { Component } from '@angular/core';
import {UserService} from './modules/services/user.service';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Агромикс';

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    moment.locale('ru');
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    return !!this.userService.getUser();
  }
}
