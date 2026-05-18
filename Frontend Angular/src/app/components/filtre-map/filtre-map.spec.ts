import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreMap } from './filtre-map';

describe('FiltreMap', () => {
  let component: FiltreMap;
  let fixture: ComponentFixture<FiltreMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltreMap],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltreMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
