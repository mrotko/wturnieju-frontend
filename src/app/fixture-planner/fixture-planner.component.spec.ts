import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixturePlannerComponent } from './fixture-planner.component';

describe('FixturePlannerComponent', () => {
  let component: FixturePlannerComponent;
  let fixture: ComponentFixture<FixturePlannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixturePlannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixturePlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
