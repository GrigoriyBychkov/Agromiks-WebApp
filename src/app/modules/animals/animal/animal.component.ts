import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from '../add-data/add-data.component';
import {AnimalService} from '../../services/animal.service';
import {MatSnackBar} from '@angular/material';
import {IAddAnimalRequest} from '../../../../../Interfaces/IAddAnimalRequest';
import {IUpdateAnimalRequest} from "../../../../../Interfaces/IUpdateAnimal";
import {IAnimal} from "../../../../../Interfaces/IAnimal";
import {IData} from "../../../../../Interfaces/IData";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {
  dataSource: IData;
  displayedColumns: string[] = ['id', 'dateBirth', 'weight', 'comment', 'actions'];
  animalId: string;


  public form: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    dateBirth: new FormControl('', Validators.required),
    dateLoss: new FormControl(''),
    comment: new FormControl('')
  });

  constructor(
    private animalService: AnimalService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {

  }

  private async fetchData(id) {
    this.dataSource = await this.animalService.getDataByAnimal(id).toPromise();
    console.log('this.dataSource ', this.dataSource);
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.fetchAnimal(params.id);
      this.fetchData(params.id);
      this.animalId = params.id;
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
    console.log(animal);
    const res = await this.animalService.updateAnimal(animal, animal.id).toPromise();

    if (res) {
      console.log('res', res);
    }
  }

   format(str: string) {
    var options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    };
    var date = new Date(str);
    return date.toLocaleString('ru', options)
  }

  public async removeData(data: IData) {
    const confirm = window.confirm('Вы действительно хотите удалить эту запись?')
    console.log('remove data id', data.id);
    if (confirm) {
      await this.animalService.removeData(data.id).toPromise();
      this.fetchData(data.animalId);
    }
  }
}
