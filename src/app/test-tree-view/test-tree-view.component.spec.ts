import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTreeViewComponent } from './test-tree-view.component';

describe('TestTreeViewComponent', () => {
  let component: TestTreeViewComponent;
  let fixture: ComponentFixture<TestTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestTreeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
