import { TestBed } from '@angular/core/testing';

import { TournamentParticipantsService } from './tournament-participants.service';

describe('TournamentParticipantsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournamentParticipantsService = TestBed.get(TournamentParticipantsService);
    expect(service).toBeTruthy();
  });
});
