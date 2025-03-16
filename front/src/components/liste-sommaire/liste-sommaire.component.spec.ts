import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeSommaireComponent } from './liste-sommaire.component';

describe('ListeSommaireComponent', () => {
  let component: ListeSommaireComponent;
  let fixture: ComponentFixture<ListeSommaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeSommaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeSommaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
