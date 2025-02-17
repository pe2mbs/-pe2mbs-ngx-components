import { TestBed } from '@angular/core/testing';

import { NgxMbsVtoolbarService } from './ngx-mbs-vtoolbar.service';

describe('NgxMbsVtoolbarService', () => {
  let service: NgxMbsVtoolbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMbsVtoolbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
