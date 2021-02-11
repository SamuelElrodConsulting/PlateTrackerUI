import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TankTypeWidgetComponent } from './tank-type-widget.component';

describe('TankTypeWidgetComponent', () => {
  let component: TankTypeWidgetComponent;
  let fixture: ComponentFixture<TankTypeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TankTypeWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TankTypeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
