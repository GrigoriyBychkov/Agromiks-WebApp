import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAnimalComponent } from './animals-list.component';

describe('AnimalsListComponent', () => {
  let component: RemoveAnimalComponent;
  let fixture: ComponentFixture<RemoveAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
