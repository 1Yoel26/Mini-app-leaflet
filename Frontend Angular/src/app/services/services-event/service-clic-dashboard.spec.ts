import { TestBed } from '@angular/core/testing';

import { ServiceClicDashboard } from './service-clic-dashboard';

describe('ServiceClicDashboard', () => {
  let service: ServiceClicDashboard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceClicDashboard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
