import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopertySearchHomeComponent } from './peoperty-search-home.component';

describe('PeopertySearchHomeComponent', () => {
  let component: PeopertySearchHomeComponent;
  let fixture: ComponentFixture<PeopertySearchHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopertySearchHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopertySearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
