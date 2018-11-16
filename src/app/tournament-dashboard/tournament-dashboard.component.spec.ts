import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentDashboardComponent } from './tournament-dashboard.component';

describe('TournamentDashboardComponent', () => {
  let component: TournamentDashboardComponent;
  let fixture: ComponentFixture<TournamentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
