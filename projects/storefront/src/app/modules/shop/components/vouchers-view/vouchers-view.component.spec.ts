import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersViewComponent } from './vouchers-view.component';

describe('VouchersViewComponent', () => {
  let component: VouchersViewComponent;
  let fixture: ComponentFixture<VouchersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VouchersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
