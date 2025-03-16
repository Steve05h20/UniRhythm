import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeChansonFormComponent } from './liste-chanson-form.component';

describe('ListeChansonFormComponent', () => {
  let component: ListeChansonFormComponent;
  let fixture: ComponentFixture<ListeChansonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeChansonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeChansonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
