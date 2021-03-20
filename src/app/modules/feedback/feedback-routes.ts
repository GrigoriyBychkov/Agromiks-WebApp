import { Routes, RouterModule } from '@angular/router';
import {FeedbackFormComponent} from './feedback-form/feedback-form.component';

export const FeedbackRoutes: Routes = [
  {
    path: '',
    component: FeedbackFormComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: 'feedback'
      // },
      // {
      //   path: 'feedback',
      //   component: FeedbackListComponent
      // }
    ]
  }
];
