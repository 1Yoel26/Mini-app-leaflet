import { TestBed } from '@angular/core/testing';

import { ServicePointsStorage } from './service-points-storage';

describe('ServicePointsStorage', () => {
  let service: ServicePointsStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePointsStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
