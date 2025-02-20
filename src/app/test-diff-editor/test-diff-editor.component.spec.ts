import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDiffEditorComponent } from './test-diff-editor.component';

describe('TestDiffEditorComponent', () => {
  let component: TestDiffEditorComponent;
  let fixture: ComponentFixture<TestDiffEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDiffEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDiffEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
