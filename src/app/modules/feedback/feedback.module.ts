import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {MatGridListModule} from '@angular/material/grid-list';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import {FeedbackRoutes} from './feedback-routes';



@NgModule({
  declarations: [FeedbackFormComponent],
  imports: [
    RouterModule.forChild(FeedbackRoutes),
    CommonModule,
    CommonModule,
    SharedModule,
    MatGridListModule,
  ]
})
export class FeedbackModule { }
