import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsTextInputComponent } from './mbs-text-input.component';

describe('MbsTextInputComponent', () => {
  let component: MbsTextInputComponent;
  let fixture: ComponentFixture<MbsTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsTextInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
