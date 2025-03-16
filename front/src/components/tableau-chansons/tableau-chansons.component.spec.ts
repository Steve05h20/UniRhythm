import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauChansonsComponent } from './tableau-chansons.component';

describe('TableauChansonsComponent', () => {
  let component: TableauChansonsComponent;
  let fixture: ComponentFixture<TableauChansonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableauChansonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauChansonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
