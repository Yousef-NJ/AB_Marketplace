import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsSearchHomeComponent } from './cars-search-home.component';

describe('CarsSearchHomeComponent', () => {
  let component: CarsSearchHomeComponent;
  let fixture: ComponentFixture<CarsSearchHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsSearchHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsSearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
