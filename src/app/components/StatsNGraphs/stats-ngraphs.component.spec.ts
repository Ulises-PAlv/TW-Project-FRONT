import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsNGraphsComponent } from './stats-ngraphs.component';

describe('StatsNGraphsComponent', () => {
  let component: StatsNGraphsComponent;
  let fixture: ComponentFixture<StatsNGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatsNGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsNGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
