import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
