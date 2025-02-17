import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSplitViewComponent } from './ngx-split-view.component';

describe('NgxSplitViewComponent', () => {
  let component: NgxSplitViewComponent;
  let fixture: ComponentFixture<NgxSplitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxSplitViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSplitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
