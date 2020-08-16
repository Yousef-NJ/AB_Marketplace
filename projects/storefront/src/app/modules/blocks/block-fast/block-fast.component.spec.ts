import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockFastComponent } from './block-fast.component';

describe('BlockFastComponent', () => {
  let component: BlockFastComponent;
  let fixture: ComponentFixture<BlockFastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockFastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockFastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
