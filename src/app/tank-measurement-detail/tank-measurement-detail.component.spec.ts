import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankMeasurementDetailComponent } from './tank-measurement-detail.component';

describe('TankMeasurementDetailComponent', () => {
  let component: TankMeasurementDetailComponent;
  let fixture: ComponentFixture<TankMeasurementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankMeasurementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankMeasurementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
