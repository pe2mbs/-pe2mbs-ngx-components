import { TestBed } from '@angular/core/testing';

import { NgxMbsFooterService } from './ngx-mbs-footer.service';

describe('NgxMbsFooterService', () => {
  let service: NgxMbsFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMbsFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
