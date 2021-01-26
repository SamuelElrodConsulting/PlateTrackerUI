import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankMeasurementComponent } from './tank-measurement.component';

describe('TankMeasurementComponent', () => {
  let component: TankMeasurementComponent;
  let fixture: ComponentFixture<TankMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankMeasurementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
