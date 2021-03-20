import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AnimalService} from '../../services/animal.service';
import {IAddAnimalRequest} from '../../../../../Interfaces/IAddAnimalRequest';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss']
})
export class AddAnimalComponent implements OnInit {
  form: FormGroup = new FormGroup({
    dateBirth: new FormControl(''),
    comment: new FormControl(''),
    dateLoss: new FormControl('')
  });

  constructor(
    private animalService: AnimalService,
    private snackBar: MatSnackBar,
  ) {

  }

  ngOnInit() {

  }

  public async submit() {
    const animal: IAddAnimalRequest = {
      ...this.form.value,
      type: 'Теленок'
    };
    const res = await this.animalService.add(animal).toPromise();
    if (res) {
      this.form.patchValue({
        dateLoss: '',
        comment: '',
        dateBirth: ''
      });
      this.snackBar.open('Животное успешно добавлено', 'ок', {
        duration: 2000,
      });
    }
  }

}
