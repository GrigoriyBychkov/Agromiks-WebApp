import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { AnimalsComponent } from './animals/animals.component';
import {AnimalsRoutes} from './animals-routes';
import { AddAnimalComponent } from './add-animal/add-animal.component';
import { AddDataComponent } from './add-data/add-data.component';
import { AnimalsListComponent } from './animals-list/animals-list.component';
import { AnimalComponent } from './animal/animal.component';
import {RemoveAnimalComponent} from './remove-animal/remove-animal.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {EditDataComponent} from './edit-data/edit-data.component';



@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AnimalsComponent, AddAnimalComponent, AddDataComponent, AnimalsListComponent, AnimalComponent, RemoveAnimalComponent, EditDataComponent],
  imports: [
    RouterModule.forChild(AnimalsRoutes),
    CommonModule,
    SharedModule,
    MatGridListModule,
    MatListModule
  ]
})
export class AnimalsModule { }
