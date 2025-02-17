import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsHeaderComponent } from './ngx-mbs-header.component';

describe('NgxMbsHeaderComponent', () => {
  let component: MbsHeaderComponent;
  let fixture: ComponentFixture<MbsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
