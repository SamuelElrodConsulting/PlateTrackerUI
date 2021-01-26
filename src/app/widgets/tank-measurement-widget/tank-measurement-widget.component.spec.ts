import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankMeasurementWidgetComponent } from './tank-measurement-widget.component';

describe('TankMeasurementWidgetComponent', () => {
  let component: TankMeasurementWidgetComponent;
  let fixture: ComponentFixture<TankMeasurementWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankMeasurementWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankMeasurementWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
