import { TestBed } from '@angular/core/testing';

import { AddTeacherServiceService } from './add-teacher-service.service';

describe('AddTeacherServiceService', () => {
  let service: AddTeacherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTeacherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
