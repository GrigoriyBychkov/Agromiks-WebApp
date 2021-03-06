import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataComponent } from './add-data.component';

describe('UpdateAnimalComponent', () => {
  let component: AddDataComponent;
  let fixture: ComponentFixture<AddDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
