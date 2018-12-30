import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteTournamentParticipantPopupComponent } from './invite-tournament-participant-popup.component';

describe('InviteTournamentParticipantPopupComponent', () => {
  let component: InviteTournamentParticipantPopupComponent;
  let fixture: ComponentFixture<InviteTournamentParticipantPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteTournamentParticipantPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteTournamentParticipantPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
