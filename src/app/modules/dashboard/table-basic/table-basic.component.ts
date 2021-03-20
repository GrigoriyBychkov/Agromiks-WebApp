import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {AnimalService} from '../../services/animal.service';
import {groupBy, each, maxBy, keys, map, sumBy} from 'lodash';

export interface PeriodicElement {
  month: string;
  growth: number;
  increase: string;
  loss: string;
  count: number;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-table-basic',
  templateUrl: './table-basic.component.html',
  styleUrls: ['./table-basic.component.scss']
})
export class TableBasicComponent implements OnInit {
  displayedColumns: string[] = ['month', 'growth', 'increase', 'loss', 'count'];
  dataSource = ELEMENT_DATA;

  constructor(
    private animalService: AnimalService
  ) {

  }

  ngOnInit() {
    this.dataSource = [];

    for (let i = 0; i < 12; i++) {
      const month = moment().startOf('year').add(i, 'month');
      this.dataSource.push({
        month: month.format('MMM'),
        growth: 0,
        increase: '0',
        loss: '0',
        count: 0
      });
    }
    console.log('datSource', this.dataSource);
    this.fetchData();
  }

  private async fetchData() {
    const result: any = {};
    const data = await this.animalService.getDataReport({
      type: 'Теленок',
      from: moment().startOf('year').toISOString(),
      to: moment().endOf('year').toISOString(),
    }).toPromise();
    const countAnimals = await this.animalService.getCountAnimals().toPromise();
    const countLossAnimals = await this.animalService.getCountLossAnimals().toPromise();
    let aniCount = 0;
    console.log('countLossAnimals', countLossAnimals);


    const groupedData = groupBy(data, (item) => {
      return moment(item.date).startOf('month').format('MMM');
    });
    // console.log('groupedData', groupedData);

    each(groupedData, (groupedList, period) => {
      result[period] = [];
      const groupedById = groupBy(groupedList, (item) => item.id);
      // console.log('key', period, groupedById);

      each(groupedById, (idGroup, id) => {
        const last = maxBy(idGroup, (item) => moment(item.date).unix());
        result[period].push(last);
        // console.log('last', period, id, last);
      });
    });
    console.log('result', result);



    each(result, (list, period) => {
      // console.log('period', period);
      // console.log('list', list);
      const sum = sumBy(list, item => item.weight);
      // console.log('sum', sum);
      // const day = moment(result.month).format('MMM');
      // console.log('month result', day);
      each(this.dataSource, (item) => {
        if (period === item.month) {
          item.growth = sum;
        }
        each(countAnimals, (count) => {
          if (moment((count.dateBirth).toString()).format('MMM') === item.month) {
            item.increase = count.countId;
          }
        });
        each(countLossAnimals, (count) => {
          if (moment((count.dateLoss).toString()).format('MMM') === item.month) {
            item.loss = count.countId;
          }
        });
      });
    });
    each(this.dataSource, (item) => {
      aniCount = aniCount + +(item.increase) - +(item.loss);
      if (item.growth !== 0) {
        item.count = aniCount;
      }
    });
  }

}
