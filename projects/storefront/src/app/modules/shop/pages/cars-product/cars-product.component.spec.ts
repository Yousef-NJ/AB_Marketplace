import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsProductComponent } from './cars-product.component';

describe('CarsProductComponent', () => {
  let component: CarsProductComponent;
  let fixture: ComponentFixture<CarsProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
