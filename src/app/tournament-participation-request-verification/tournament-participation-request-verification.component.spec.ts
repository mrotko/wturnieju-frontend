import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentParticipationRequestVerificationComponent } from './tournament-participation-request-verification.component';

describe('TournamentParticipationRequestVerificationComponent', () => {
  let component: TournamentParticipationRequestVerificationComponent;
  let fixture: ComponentFixture<TournamentParticipationRequestVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentParticipationRequestVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentParticipationRequestVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
