import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCompte } from './creation-compte';

describe('CreationCompte', () => {
  let component: CreationCompte;
  let fixture: ComponentFixture<CreationCompte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationCompte],
    }).compileComponents();

    fixture = TestBed.createComponent(CreationCompte);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
