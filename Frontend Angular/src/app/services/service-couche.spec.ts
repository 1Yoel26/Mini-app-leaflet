import { TestBed } from '@angular/core/testing';

import { ServiceCouche } from './service-couche';

describe('ServiceCouche', () => {
  let service: ServiceCouche;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCouche);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
