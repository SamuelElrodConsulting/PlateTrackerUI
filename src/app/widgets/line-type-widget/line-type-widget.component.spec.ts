import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineTypeWidgetComponent } from './line-type-widget.component';

describe('LineTypeWidgetComponent', () => {
  let component: LineTypeWidgetComponent;
  let fixture: ComponentFixture<LineTypeWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineTypeWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineTypeWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
