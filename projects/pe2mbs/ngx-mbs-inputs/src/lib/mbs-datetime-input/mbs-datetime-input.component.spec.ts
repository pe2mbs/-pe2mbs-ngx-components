import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsDatetimeInputComponent } from './mbs-datetime-input.component';

describe('MbsDatetimeInputComponent', () => {
  let component: MbsDatetimeInputComponent;
  let fixture: ComponentFixture<MbsDatetimeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsDatetimeInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsDatetimeInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
