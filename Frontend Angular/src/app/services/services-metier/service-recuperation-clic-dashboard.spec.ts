import { TestBed } from '@angular/core/testing';

import { ServiceRecuperationClicDashboard } from './service-recuperation-clic-dashboard';

describe('ServiceRecuperationClicDashboard', () => {
  let service: ServiceRecuperationClicDashboard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceRecuperationClicDashboard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
