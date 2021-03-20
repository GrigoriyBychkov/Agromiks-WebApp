import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {LoginRoutes} from './login-routes';
import {SharedModule} from '../shared/shared.module';
import {RegistrationComponent} from './registration/registration.component';
import {DropPasswordComponent} from './dropPassword/dropPassword.component';
import {ProfileComponent} from './profile/profile.component';




@NgModule({
  declarations: [LoginComponent, RegistrationComponent, DropPasswordComponent, ProfileComponent],
  imports: [
    RouterModule.forChild(LoginRoutes),
    CommonModule,
    SharedModule
  ]
})
export class LoginModule { }
