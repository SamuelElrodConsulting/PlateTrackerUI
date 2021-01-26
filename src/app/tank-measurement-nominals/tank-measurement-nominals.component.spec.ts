import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankMeasurmentNominalsComponent } from './tank-measurement-nominals.component';

describe('TankMeasurmentNominalComponent', () => {
  let component: TankMeasurmentNominalsComponent;
  let fixture: ComponentFixture<TankMeasurmentNominalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankMeasurmentNominalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankMeasurmentNominalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
