import {inject, TestBed} from '@angular/core/testing';

import {CanActivateAuthComponentGuard} from './can-activate-auth-component.guard';

describe('CanActivateAuthComponentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateAuthComponentGuard]
    });
  });

  it('should ...', inject([CanActivateAuthComponentGuard], (guard: CanActivateAuthComponentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
