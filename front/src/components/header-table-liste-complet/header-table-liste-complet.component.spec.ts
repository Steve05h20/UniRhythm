import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTableListeCompletComponent } from './header-table-liste-complet.component';

describe('HeaderTableListeCompletComponent', () => {
  let component: HeaderTableListeCompletComponent;
  let fixture: ComponentFixture<HeaderTableListeCompletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTableListeCompletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderTableListeCompletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
