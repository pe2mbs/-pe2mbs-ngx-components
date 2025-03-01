import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsSliderInputComponent } from './mbs-slider-input.component';

describe('MbsSliderInputComponent', () => {
  let component: MbsSliderInputComponent;
  let fixture: ComponentFixture<MbsSliderInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsSliderInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsSliderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
