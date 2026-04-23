import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulairePoint } from './formulaire-point';

describe('FormulairePoint', () => {
  let component: FormulairePoint;
  let fixture: ComponentFixture<FormulairePoint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulairePoint],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulairePoint);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
