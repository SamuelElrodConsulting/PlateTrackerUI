import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineTankTypeComponent } from './line-tank-type.component';

describe('LineTankTypeComponent', () => {
  let component: LineTankTypeComponent;
  let fixture: ComponentFixture<LineTankTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineTankTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineTankTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
