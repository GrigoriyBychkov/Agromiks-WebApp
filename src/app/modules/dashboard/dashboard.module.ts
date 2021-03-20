import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule} from '@angular/router';
import {DashboardRoutes} from './dashboard-routes';
import {SharedModule} from '../shared/shared.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { ChartGrowthComponent } from './chart-growth/chart-growth.component';
import { TableBasicComponent } from './table-basic/table-basic.component';

@NgModule({
  declarations: [DashboardComponent, WidgetsComponent, ChartGrowthComponent, TableBasicComponent],
  imports: [
    RouterModule.forChild(DashboardRoutes),
    CommonModule,
    SharedModule
  ]
})
export class DashboardModule { }
