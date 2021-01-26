import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankMeasurmentTypesComponentComponent } from './tank-measurment-types-component.component';

describe('TankMeasurmentTypesComponentComponent', () => {
  let component: TankMeasurmentTypesComponentComponent;
  let fixture: ComponentFixture<TankMeasurmentTypesComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankMeasurmentTypesComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankMeasurmentTypesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
