import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMbsFooterComponent } from './ngx-mbs-footer.component';

describe('NgxMbsFooterComponent', () => {
  let component: NgxMbsFooterComponent;
  let fixture: ComponentFixture<NgxMbsFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxMbsFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMbsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
