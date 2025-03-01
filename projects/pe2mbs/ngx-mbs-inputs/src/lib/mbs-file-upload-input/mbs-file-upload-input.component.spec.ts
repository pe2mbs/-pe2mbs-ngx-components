import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbsFileUploadInputComponent } from './mbs-file-upload-input.component';

describe('MbsFileUploadInputComponent', () => {
  let component: MbsFileUploadInputComponent;
  let fixture: ComponentFixture<MbsFileUploadInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbsFileUploadInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MbsFileUploadInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
