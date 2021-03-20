import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {DropPasswordComponent} from './dropPassword/dropPassword.component';
import {ProfileComponent} from './profile/profile.component';

export const LoginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'dropPassword',
    component: DropPasswordComponent
  }
];
