import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankTypeComponent } from './tank-type.component';

describe('TankTypeComponent', () => {
  let component: TankTypeComponent;
  let fixture: ComponentFixture<TankTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
