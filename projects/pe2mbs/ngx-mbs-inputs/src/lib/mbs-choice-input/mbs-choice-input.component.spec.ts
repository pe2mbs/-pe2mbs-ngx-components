import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsChoiceInputComponent } from './mbs-choice-input.component';

describe('MbsChoiceInputComponent', () => {
  let component: MbsChoiceInputComponent;
  let fixture: ComponentFixture<MbsChoiceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsChoiceInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsChoiceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
