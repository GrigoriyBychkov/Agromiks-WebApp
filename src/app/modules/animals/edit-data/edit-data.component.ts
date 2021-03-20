import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AnimalService} from '../../services/animal.service';
import {map} from 'lodash';
import * as moment from 'moment';
import {MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {
  public ids: [];

  public form: FormGroup = new FormGroup({
    animalId: new FormControl('', Validators.required),
    comment: new FormControl(''),
    date: new FormControl('', [Validators.required]),
    id: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    weight: new FormControl('', Validators.required),

  });

  constructor(
    private animalService: AnimalService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.fetchData(params.id);
    });
  }

  private async fetchData(id: string) {
    const data = await this.animalService.getDataById(id).toPromise();
    console.log('data edit-data.ts', data);
    this.form.patchValue(data);
  }


  private async fetchIds() {
    const animals = await this.animalService.getList().toPromise();
    this.ids = map(animals, 'id');
  }

  public async submit() {
    const data = this.form.value;
    const res = await this.animalService.updateData(data, data.id).toPromise();

    if (res) {
      this.form.patchValue({
        res
      });
      this.snackBar.open('Данные успешно обновлены', 'ок', {
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
