import { GameRulesModule } from './game-rules.module';

describe('GameRulesModule', () => {
  let gameRulesModule: GameRulesModule;

  beforeEach(() => {
    gameRulesModule = new GameRulesModule();
  });

  it('should create an instance', () => {
    expect(gameRulesModule).toBeTruthy();
  });
});
