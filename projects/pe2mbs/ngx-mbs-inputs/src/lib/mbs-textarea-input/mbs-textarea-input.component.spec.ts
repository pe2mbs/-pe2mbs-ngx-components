import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsTextareaInputComponent } from './mbs-textarea-input.component';

describe('MbsTextareaInputComponent', () => {
  let component: MbsTextareaInputComponent;
  let fixture: ComponentFixture<MbsTextareaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsTextareaInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsTextareaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
