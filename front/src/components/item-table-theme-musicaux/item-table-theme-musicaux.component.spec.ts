import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTableThemeMusicauxComponent } from './item-table-theme-musicaux.component';

describe('ItemTableThemeMusicauxComponent', () => {
  let component: ItemTableThemeMusicauxComponent;
  let fixture: ComponentFixture<ItemTableThemeMusicauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTableThemeMusicauxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTableThemeMusicauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
