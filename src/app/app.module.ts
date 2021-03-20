import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginRoutes } from './modules/login/login-routes';
import {LoginModule} from './modules/login/login.module';
import {DashboardModule} from './modules/dashboard/dashboard.module';
import {SharedModule} from './modules/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {FeedbackModule} from './modules/feedback/feedback.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LoginModule,
    DashboardModule,
    FeedbackModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
