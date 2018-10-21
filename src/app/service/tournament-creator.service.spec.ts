import { TestBed } from '@angular/core/testing';

import { TournamentCreatorService } from './tournament-creator.service';

describe('TournamentCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TournamentCreatorService = TestBed.get(TournamentCreatorService);
    expect(service).toBeTruthy();
  });
});
