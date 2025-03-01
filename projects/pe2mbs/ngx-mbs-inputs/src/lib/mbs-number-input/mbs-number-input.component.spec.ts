import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsNumberInputComponent } from './mbs-number-input.component';

describe('MbsNumberInputComponent', () => {
  let component: MbsNumberInputComponent;
  let fixture: ComponentFixture<MbsNumberInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsNumberInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsNumberInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
