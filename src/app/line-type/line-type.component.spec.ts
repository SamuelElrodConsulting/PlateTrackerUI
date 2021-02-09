import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineTypeComponent } from './line-type.component';

describe('LineTypeComponent', () => {
  let component: LineTypeComponent;
  let fixture: ComponentFixture<LineTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
