import { Component, OnInit } from '@angular/core';
import {AnimalService} from '../../services/animal.service';
import * as moment from 'moment';
import {IAnimal} from '../../../../../Interfaces/IAnimal';

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
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'dateBirth', 'weight', 'comment', 'actions'];
  dataSource: IAnimal[];

  constructor(
    private animalsService: AnimalService
  ) {
    this.fetchData();
  }

  private async fetchData() {
    this.dataSource = await this.animalsService.getList().toPromise();
  }

  ngOnInit() {
  }

  public age(dbirth) {
    const birth = moment(dbirth);
    const diff = moment().diff(birth);
    return moment.duration(diff).humanize();
  }

  public async removeAnimal(animal: IAnimal) {
    const confirm = window.confirm('Вы действительно хотите удалить эту запись?')
    if (confirm) {
      await this.animalsService.removeAnimal(animal.id).toPromise();
      this.fetchData();
    }
  }

}
