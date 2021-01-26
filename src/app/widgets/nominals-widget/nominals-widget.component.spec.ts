import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NominalsWidgetComponent } from './nominals-widget.component';

describe('NominalsWidgetComponent', () => {
  let component: NominalsWidgetComponent;
  let fixture: ComponentFixture<NominalsWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NominalsWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NominalsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
