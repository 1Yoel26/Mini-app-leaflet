import { TestBed } from '@angular/core/testing';

import { ServiceExtraitDescription } from './service-extrait-description';

describe('ServiceExtraitDescription', () => {
  let service: ServiceExtraitDescription;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceExtraitDescription);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
