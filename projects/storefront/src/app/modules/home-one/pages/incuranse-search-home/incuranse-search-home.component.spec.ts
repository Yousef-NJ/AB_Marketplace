import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncuranseSearchHomeComponent } from './incuranse-search-home.component';

describe('IncuranseSearchHomeComponent', () => {
  let component: IncuranseSearchHomeComponent;
  let fixture: ComponentFixture<IncuranseSearchHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncuranseSearchHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncuranseSearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
