import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AnimalService} from '../../services/animal.service';
import {map} from 'lodash';
import * as moment from 'moment';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  public ids: [];

  public form: FormGroup = new FormGroup({
    animalId: new FormControl('', Validators.required),
    date: new FormControl(moment().format(), Validators.required),
    weight: new FormControl('', Validators.required),
    comment: new FormControl('')
  });

  constructor(
    private animalService: AnimalService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchIds();
    this.activatedRoute.params.subscribe((params) => {
      this.form.get('animalId').setValue(params.id);
    });
  }

  private async fetchIds() {
    const animals = await this.animalService.getList().toPromise();
    this.ids = map(animals, 'id');
  }

  public async submit() {
    const animal = this.form.value;
    console.log('animal', animal);
    const res = await this.animalService.addData(animal).toPromise();
    console.log('result', res);

    if (res) {
      this.form.patchValue({
        animalId: '',
        weight: ''
      });
      this.snackBar.open('Данные успешно добавленны', 'ок', {
        duration: 2000,
      });
    }
  }

  public autoFilter(ids: string[]) {
    if (ids) {
      return ids.filter((id) => id.indexOf(this.form.value.animalId) > -1);
    }
    return [];
  }

}
