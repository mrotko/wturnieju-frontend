import { DataTransferModule } from './data-transfer.module';

describe('DataTransferModule', () => {
  let dataTransferModule: DataTransferModule;

  beforeEach(() => {
    dataTransferModule = new DataTransferModule();
  });

  it('should create an instance', () => {
    expect(dataTransferModule).toBeTruthy();
  });
});
