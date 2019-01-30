import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountVerificationComponent} from './account/account-verification.component';
import {EmailVerificationComponent} from './email/email-verification.component';
import {PasswordVerificationComponent} from './password/password-verification.component';
import {TournamentParticipationRequestVerificationComponent} from './tournament-participation-request/tournament-participation-request-verification.component';
import {SharedModule} from '../shared.module';
import {TournamentInviteVerificationComponent} from './tournament-invite/tournament-invite-verification.component';
import {AuthService} from '../service/auth.service';
import {TournamentService} from '../tournament.service';
import {VerificationRoutingModule} from './verification-routing.module';

@NgModule({
  declarations: [
    AccountVerificationComponent,
    EmailVerificationComponent,
    PasswordVerificationComponent,
    TournamentParticipationRequestVerificationComponent,
    TournamentInviteVerificationComponent
  ],
  providers: [
    AuthService,
    TournamentService,
  ],
  imports: [
    VerificationRoutingModule,
    CommonModule,
    SharedModule,
  ]
})
export class VerificationModule {
}
