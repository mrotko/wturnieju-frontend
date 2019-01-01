import { TestBed, async, inject } from '@angular/core/testing';

import { VerificationComponentGuard } from './verification-component.guard';

describe('VerificationComponentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificationComponentGuard]
    });
  });

  it('should ...', inject([VerificationComponentGuard], (guard: VerificationComponentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
