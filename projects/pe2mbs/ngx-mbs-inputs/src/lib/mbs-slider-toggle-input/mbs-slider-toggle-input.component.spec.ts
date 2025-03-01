import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsSliderToggleInputComponent } from './mbs-slider-toggle-input.component';

describe('MbsSliderToggleInputComponent', () => {
  let component: MbsSliderToggleInputComponent;
  let fixture: ComponentFixture<MbsSliderToggleInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsSliderToggleInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsSliderToggleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
