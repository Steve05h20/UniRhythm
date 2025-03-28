import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFormComponent } from './liste-form.component';

describe('ListeFormComponent', () => {
  let component: ListeFormComponent;
  let fixture: ComponentFixture<ListeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
