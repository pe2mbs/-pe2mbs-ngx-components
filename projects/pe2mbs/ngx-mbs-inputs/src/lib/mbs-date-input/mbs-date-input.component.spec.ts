import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsDateInputComponent } from './mbs-date-input.component';

describe('MbsDateInputComponent', () => {
  let component: MbsDateInputComponent;
  let fixture: ComponentFixture<MbsDateInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsDateInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsDateInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
