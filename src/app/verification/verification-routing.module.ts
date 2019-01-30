import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailVerificationComponent} from './email/email-verification.component';
import {TournamentParticipationRequestVerificationComponent} from './tournament-participation-request/tournament-participation-request-verification.component';
import {AuthRequiredGuard} from '../guard/auth-required.guard';
import {TournamentInviteVerificationComponent} from './tournament-invite/tournament-invite-verification.component';
import {PasswordVerificationComponent} from './password/password-verification.component';
import {AccountVerificationComponent} from './account/account-verification.component';
import {VerificationGuard} from './verification-guard.service';

const routes: Routes = [
  {
    path: '', canActivate: [VerificationGuard], children: [
      {path: 'account', component: AccountVerificationComponent},
      {path: 'password', component: PasswordVerificationComponent},
      {path: 'tournament-invitation', component: TournamentInviteVerificationComponent},
      {
        path: 'tournament-participation-request', canActivate: [AuthRequiredGuard],
        component: TournamentParticipationRequestVerificationComponent
      },
      {path: 'email', component: EmailVerificationComponent}
    ]
  },
];

@NgModule({
  exports: [RouterModule],
  providers: [
    AuthRequiredGuard,
    VerificationGuard
  ],
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ]
})
export class VerificationRoutingModule {
}
