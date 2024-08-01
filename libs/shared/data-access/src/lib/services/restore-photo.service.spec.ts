import { TestBed } from '@angular/core/testing';

import { RestorePhotoService } from './restore-photo.service';

describe('RestorePhotoService', () => {
  let service: RestorePhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestorePhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
