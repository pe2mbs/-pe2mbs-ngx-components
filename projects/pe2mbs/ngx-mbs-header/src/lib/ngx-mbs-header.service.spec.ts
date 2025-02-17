import { TestBed } from '@angular/core/testing';
import { NgxMbsHeaderService } from './ngx-mbs-header.service';


describe('NgxMbsHeaderService', () => {
  let service: NgxMbsHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxMbsHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
