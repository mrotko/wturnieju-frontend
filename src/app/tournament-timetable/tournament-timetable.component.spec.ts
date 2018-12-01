import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentTimetableComponent } from './tournament-timetable.component';

describe('TournamentTimetableComponent', () => {
  let component: TournamentTimetableComponent;
  let fixture: ComponentFixture<TournamentTimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentTimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
