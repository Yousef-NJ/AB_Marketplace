import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSearchComponent } from './travel-search.component';

describe('TravelSearchComponent', () => {
  let component: TravelSearchComponent;
  let fixture: ComponentFixture<TravelSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
