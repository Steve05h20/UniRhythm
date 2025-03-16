import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChansonComponent } from './chanson.component';

describe('ChansonComponent', () => {
  let component: ChansonComponent;
  let fixture: ComponentFixture<ChansonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChansonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChansonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
