import { TestBed } from '@angular/core/testing';

import { ServiceFormulairePoint } from './service-formulaire-point';

describe('ServiceFormulairePoint', () => {
  let service: ServiceFormulairePoint;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceFormulairePoint);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
