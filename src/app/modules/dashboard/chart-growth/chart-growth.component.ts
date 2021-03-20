import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import * as Highcharts from 'highcharts';
import {Options} from 'highcharts';
import {FormControl, FormGroup} from '@angular/forms';
import {DateAdapter} from '@angular/material';
import {AnimalService} from '../../services/animal.service';
import * as moment from 'moment';
declare var require: any;
import {groupBy, each, maxBy, keys, map, sumBy} from 'lodash';

const boost = require('highcharts/modules/boost');
const noData = require('highcharts/modules/no-data-to-display');
const more = require('highcharts/highcharts-more');

boost(Highcharts);
noData(Highcharts);
more(Highcharts);
// noData(Highcharts);


@Component({
  selector: 'app-chart-growth',
  templateUrl: './chart-growth.component.html',
  styleUrls: ['./chart-growth.component.scss']
})
export class ChartGrowthComponent implements OnInit {
  @ViewChild('chart', {static: true}) private chartEl: ElementRef;

  form: FormGroup = new FormGroup({
    from: new FormControl(moment().startOf('year').toISOString()),
    to: new FormControl(moment().toISOString()),
    period: new FormControl('month'),
  });

  public chart: Highcharts.Chart;

  public options: Options | any = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Прирост КРС'
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: 'Прирост %'
      }
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true
        },
        enableMouseTracking: false
      }
    },
    series: [{
      name: 'Общий вес',
      data: []
    }]
  };
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private animalService: AnimalService
  ) { }

  ngOnInit() {
    this.dateAdapter.setLocale('ru');
    this.chart = Highcharts.chart(this.chartEl.nativeElement, this.options);
    this.fetchData();

    this.form.valueChanges.subscribe(() => this.fetchData());
  }

  private async fetchData() {
    const result: any = {};
    const formData = this.form.value;

    const data = await this.animalService.getDataReport({
      type: 'Теленок',
      from: formData.from,
      to: formData.to,
    }).toPromise();

    let groupedData;

    if (formData.period === 'month') {
      groupedData = groupBy(data, (item) => {
        return moment(item.date).startOf('month').format('MMM YYYY');
      });
    } else if (formData.period === 'week') {
      groupedData = groupBy(data, (item) => {
        return moment(item.date).startOf('week').format('D MMM YYYY');
      });
    }


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
    // console.log('result', result);
    this.chart.series[0].remove();
    this.chart.addSeries({
      name: 'Общий вес',
      data: []
    } as any);

    each(result, (list, period) => {
      // console.log('period', period);
      const sum = sumBy(list, item => item.weight);
      const day = moment(result.date).format('DD');
      this.chart.xAxis[0].setCategories(keys(result));
      this.chart.series[0].addPoint([period, sum]);
    });

    // console.log('this.options.series[0]', this.options.series[0]);
  }

}
