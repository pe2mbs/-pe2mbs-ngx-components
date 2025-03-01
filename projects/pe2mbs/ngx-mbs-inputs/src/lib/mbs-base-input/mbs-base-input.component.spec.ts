import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsBaseInputComponent } from './mbs-base-input.component';

describe('MbsBaseInputComponent', () => {
  let component: MbsBaseInputComponent;
  let fixture: ComponentFixture<MbsBaseInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsBaseInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsBaseInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
