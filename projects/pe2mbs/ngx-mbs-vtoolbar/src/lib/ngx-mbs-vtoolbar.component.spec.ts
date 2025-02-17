import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMbsVtoolbarComponent } from './ngx-mbs-vtoolbar.component';

describe('NgxMbsVtoolbarComponent', () => {
  let component: NgxMbsVtoolbarComponent;
  let fixture: ComponentFixture<NgxMbsVtoolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMbsVtoolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMbsVtoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
