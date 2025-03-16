import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemesMusicauxComponent } from './themes-musicaux.component';

describe('ThemesMusicauxComponent', () => {
  let component: ThemesMusicauxComponent;
  let fixture: ComponentFixture<ThemesMusicauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemesMusicauxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemesMusicauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
