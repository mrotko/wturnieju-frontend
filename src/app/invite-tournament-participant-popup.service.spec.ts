import { TestBed } from '@angular/core/testing';

import { InviteTournamentParticipantPopupService } from './invite-tournament-participant-popup.service';

describe('InviteTournamentParticipantPopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InviteTournamentParticipantPopupService = TestBed.get(InviteTournamentParticipantPopupService);
    expect(service).toBeTruthy();
  });
});
