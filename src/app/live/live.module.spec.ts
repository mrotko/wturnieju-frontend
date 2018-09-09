import { LiveModule } from './live.module';

describe('LiveModule', () => {
  let liveModule: LiveModule;

  beforeEach(() => {
    liveModule = new LiveModule();
  });

  it('should create an instance', () => {
    expect(liveModule).toBeTruthy();
  });
});
