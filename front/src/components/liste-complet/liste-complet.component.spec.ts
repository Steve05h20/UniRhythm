import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCompletComponent } from './liste-complet.component';

describe('ListeCompletComponent', () => {
  let component: ListeCompletComponent;
  let fixture: ComponentFixture<ListeCompletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeCompletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCompletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
