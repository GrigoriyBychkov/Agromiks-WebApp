import { Component, OnInit } from '@angular/core';
import {AnimalService} from '../../services/animal.service';
import * as moment from 'moment';
import {IAnimal} from '../../../../../Interfaces/IAnimal';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IAddAnimalRequest} from "../../../../../Interfaces/IAddAnimalRequest";
import {IUpdateAnimalRequest} from "../../../../../Interfaces/IUpdateAnimal";
// import {Router} from '@angular/router';

export interface PeriodicElement {
  id: string;
  companyId: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  updatedBy: number;
  dateBirth: string;
  comment: string;
  weight?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-remove-animal',
  templateUrl: './remove-animal.component.html',
  styleUrls: ['./remove-animal.component.scss']
})
export class RemoveAnimalComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    dateBirth: new FormControl('', Validators.required),
    comment: new FormControl('')
  });

  constructor(
    private animalService: AnimalService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.fetchAnimal(params.id);
    });
  }

  private async fetchAnimal(id: string) {
    const animal = await this.animalService.getById(id).toPromise();
    this.form.patchValue(animal);
  }

  public async submit() {
    const animal: IUpdateAnimalRequest = {
      ...this.form.value,
      type: 'Теленок'
    };
    const res = await this.animalService.removeAnimal(animal.id).toPromise();

    if (res) {
      console.log('res', res);
      await this.router.navigate(['/animals/list'])

    }
  }


  // public age(dbirth) {
  //   const birth = moment(dbirth);
  //   const diff = moment().diff(birth);
  //   return moment.duration(diff).humanize();
  // }

}
