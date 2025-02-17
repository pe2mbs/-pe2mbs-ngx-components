import { TestBed } from '@angular/core/testing';

import { NgxSplitViewService } from './ngx-split-view.service';

describe('NgxSplitViewService', () => {
  let service: NgxSplitViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxSplitViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
