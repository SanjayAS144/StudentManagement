import { TestBed } from '@angular/core/testing';

import { AddResultService } from './add-result.service';

describe('AddResultService', () => {
  let service: AddResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
