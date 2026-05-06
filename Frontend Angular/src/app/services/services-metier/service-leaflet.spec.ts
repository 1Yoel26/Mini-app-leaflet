import { TestBed } from '@angular/core/testing';

import { ServiceLeaflet } from './service-leaflet';

describe('ServiceLeaflet', () => {
  let service: ServiceLeaflet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLeaflet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
