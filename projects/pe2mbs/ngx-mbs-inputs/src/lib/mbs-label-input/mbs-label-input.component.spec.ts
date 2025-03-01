import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsLabelInputComponent } from './mbs-label-input.component';

describe('MbsLabelInputComponent', () => {
  let component: MbsLabelInputComponent;
  let fixture: ComponentFixture<MbsLabelInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsLabelInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsLabelInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
