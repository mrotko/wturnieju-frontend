import { TournamentCreatorModule } from './tournament-creator.module';

describe('TournamentCreatorModule', () => {
  let tournamentCreatorModule: TournamentCreatorModule;

  beforeEach(() => {
    tournamentCreatorModule = new TournamentCreatorModule();
  });

  it('should create an instance', () => {
    expect(tournamentCreatorModule).toBeTruthy();
  });
});
