import { TestBed } from '@angular/core/testing';

import { ReplicateService } from './replicate.service';

describe('ReplicateService', () => {
  let service: ReplicateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplicateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
