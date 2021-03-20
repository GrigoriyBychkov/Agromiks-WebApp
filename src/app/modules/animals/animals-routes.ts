import { Routes } from '@angular/router';

import { AnimalsComponent } from './animals/animals.component';
import {AddAnimalComponent} from './add-animal/add-animal.component';
import {AddDataComponent} from './add-data/add-data.component';
import {AnimalsListComponent} from './animals-list/animals-list.component';
import {AnimalComponent} from './animal/animal.component';
import {RemoveAnimalComponent} from './remove-animal/remove-animal.component';
import {EditDataComponent} from './edit-data/edit-data.component';

export const AnimalsRoutes: Routes = [
  {
    path: '',
    component: AnimalsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: AnimalsListComponent
      },
      {
        path: 'remove/:id',
        component: RemoveAnimalComponent
      },
      {
        path: 'add',
        component: AddAnimalComponent
      },
      {
        path: 'update',
        component: AddDataComponent
      },
      {
        path: 'update/:id',
        component: AddDataComponent
      },
      {
        path: 'edit/:id',
        component: AnimalComponent
      },
      {
        path: 'getDataById/:id',
        component: EditDataComponent
      }
    ]
  }
];
