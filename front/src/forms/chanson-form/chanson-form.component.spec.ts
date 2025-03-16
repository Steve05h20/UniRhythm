import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChansonFormComponent } from './chanson-form.component';

describe('ChansonFormComponent', () => {
  let component: ChansonFormComponent;
  let fixture: ComponentFixture<ChansonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChansonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChansonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
