import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotimageShapeComponent } from './spotimage-shape.component';

describe('SpotimageShapeComponent', () => {
  let component: SpotimageShapeComponent;
  let fixture: ComponentFixture<SpotimageShapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotimageShapeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotimageShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
