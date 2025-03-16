import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTableListeCompletComponent } from './item-table-liste-complet.component';

describe('ItemTableListeCompletComponent', () => {
  let component: ItemTableListeCompletComponent;
  let fixture: ComponentFixture<ItemTableListeCompletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTableListeCompletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTableListeCompletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
