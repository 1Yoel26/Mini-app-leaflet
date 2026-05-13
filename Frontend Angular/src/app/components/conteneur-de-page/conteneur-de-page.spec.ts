import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteneurDePage } from './conteneur-de-page';

describe('ConteneurDePage', () => {
  let component: ConteneurDePage;
  let fixture: ComponentFixture<ConteneurDePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConteneurDePage],
    }).compileComponents();

    fixture = TestBed.createComponent(ConteneurDePage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
