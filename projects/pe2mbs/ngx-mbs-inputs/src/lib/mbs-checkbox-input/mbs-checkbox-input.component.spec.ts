import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsCheckboxInputComponent } from './mbs-checkbox-input.component';

describe('MbsCheckboxInputComponent', () => {
  let component: MbsCheckboxInputComponent;
  let fixture: ComponentFixture<MbsCheckboxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsCheckboxInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsCheckboxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
