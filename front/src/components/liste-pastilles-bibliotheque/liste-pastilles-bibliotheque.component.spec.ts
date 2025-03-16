import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListePastillesBibliothequeComponent } from './liste-pastilles-bibliotheque.component';

describe('ListePastillesBibliothequeComponent', () => {
  let component: ListePastillesBibliothequeComponent;
  let fixture: ComponentFixture<ListePastillesBibliothequeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListePastillesBibliothequeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListePastillesBibliothequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
