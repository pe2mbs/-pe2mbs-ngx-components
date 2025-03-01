import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsTimeInputComponent } from './mbs-time-input.component';

describe('MbsTimeInputComponent', () => {
  let component: MbsTimeInputComponent;
  let fixture: ComponentFixture<MbsTimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsTimeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsTimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
