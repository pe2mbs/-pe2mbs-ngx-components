import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsPasswordInputComponent } from './mbs-password-input.component';

describe('MbsPasswordInputComponent', () => {
  let component: MbsPasswordInputComponent;
  let fixture: ComponentFixture<MbsPasswordInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsPasswordInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsPasswordInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
