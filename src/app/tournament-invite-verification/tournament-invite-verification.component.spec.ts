import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentInviteVerificationComponent } from './tournament-invite-verification.component';

describe('TournamentInviteVerificationComponent', () => {
  let component: TournamentInviteVerificationComponent;
  let fixture: ComponentFixture<TournamentInviteVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentInviteVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentInviteVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
