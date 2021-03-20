import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatSelectModule, MatNativeDateModule, MatTableModule, MatTabsModule, MatIconModule, MatMenuModule,
  MatAutocompleteModule, MatSnackBarModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../services/user.service';
import {HttpClientModule} from '@angular/common/http';
import {AnimalService} from '../services/animal.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatTabsModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  providers: [
    UserService,
    AnimalService
  ]
})
export class SharedModule { }
