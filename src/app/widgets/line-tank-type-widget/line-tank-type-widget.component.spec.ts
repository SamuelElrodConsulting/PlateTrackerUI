import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineTankTypeWidgetComponent } from './line-tank-type-widget.component';

describe('LineTankTypeWidgetComponent', () => {
  let component: LineTankTypeWidgetComponent;
  let fixture: ComponentFixture<LineTankTypeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineTankTypeWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineTankTypeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
