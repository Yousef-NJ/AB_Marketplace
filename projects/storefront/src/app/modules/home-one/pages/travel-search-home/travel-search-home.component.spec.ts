import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSearchHomeComponent } from './travel-search-home.component';

describe('TravelSearchHomeComponent', () => {
  let component: TravelSearchHomeComponent;
  let fixture: ComponentFixture<TravelSearchHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelSearchHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelSearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
