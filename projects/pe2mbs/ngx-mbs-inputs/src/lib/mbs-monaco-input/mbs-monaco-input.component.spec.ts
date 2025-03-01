import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsMonacoInputComponent } from './mbs-monaco-input.component';

describe('MbsMonacoInputComponent', () => {
  let component: MbsMonacoInputComponent;
  let fixture: ComponentFixture<MbsMonacoInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsMonacoInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsMonacoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
