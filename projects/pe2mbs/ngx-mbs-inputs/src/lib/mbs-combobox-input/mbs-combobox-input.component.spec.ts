import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsComboboxInputComponent } from './mbs-combobox-input.component';

describe('MbsComboboxInputComponent', () => {
  let component: MbsComboboxInputComponent;
  let fixture: ComponentFixture<MbsComboboxInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsComboboxInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsComboboxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
