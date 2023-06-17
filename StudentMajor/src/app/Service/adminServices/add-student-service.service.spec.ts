import { TestBed } from '@angular/core/testing';

import { AddStudentServiceService } from '../Student/add-student-service.service';

describe('AddStudentServiceService', () => {
  let service: AddStudentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddStudentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
