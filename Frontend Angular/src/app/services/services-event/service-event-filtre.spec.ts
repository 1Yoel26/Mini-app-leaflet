import { TestBed } from '@angular/core/testing';

import { ServiceEventFiltre } from './service-event-filtre';

describe('ServiceEventFiltre', () => {
  let service: ServiceEventFiltre;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEventFiltre);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
