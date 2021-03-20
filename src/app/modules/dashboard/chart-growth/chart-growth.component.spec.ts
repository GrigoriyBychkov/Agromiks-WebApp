import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGrowthComponent } from './chart-growth.component';

describe('ChartGrowthComponent', () => {
  let component: ChartGrowthComponent;
  let fixture: ComponentFixture<ChartGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
