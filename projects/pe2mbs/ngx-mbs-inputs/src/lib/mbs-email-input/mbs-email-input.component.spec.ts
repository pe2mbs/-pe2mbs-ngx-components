import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsEmailInputComponent } from './mbs-email-input.component';

describe('MbsEmailInputComponent', () => {
  let component: MbsEmailInputComponent;
  let fixture: ComponentFixture<MbsEmailInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsEmailInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsEmailInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
