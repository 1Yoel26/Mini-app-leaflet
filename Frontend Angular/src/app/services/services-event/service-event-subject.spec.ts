import { TestBed } from '@angular/core/testing';

import { ServiceEventSubject } from '../services-event/service-event-subject';

describe('ServiceEventSubject', () => {
  let service: ServiceEventSubject;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEventSubject);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
