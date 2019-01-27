import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './auth/auth.component';
import {CanActivateAuthComponentGuard} from './guard/can-activate-auth-component.guard';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {ForgetPasswordComponent} from './auth/forget-password/forget-password.component';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {AuthRequiredGuard} from './guard/auth-required.guard';
import {TournamentCreatorComponent} from './tournament-creator/tournament-creator.component';
import {TournamentsComponent} from './my-tournaments/tournaments.component';
import {CliComponent} from './cli/cli.component';
import {TournamentDashboardComponent} from './tournament-dashboard/tournament-dashboard.component';
import {VerificationComponentGuard} from './verification-component.guard';
import {AccountVerificationComponent} from './account-verification/account-verification.component';
import {PasswordVerificationComponent} from './password-verification/password-verification.component';
import {TournamentInviteVerificationComponent} from './tournament-invite-verification/tournament-invite-verification.component';
import {TournamentParticipationRequestVerificationComponent} from './tournament-participation-request-verification/tournament-participation-request-verification.component';
import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [

  {
    path: '', component: HomeComponent
  },
  {
    path: 'auth', component: AuthComponent, canActivate: [CanActivateAuthComponentGuard], children:
      [
        {path: 'login', component: LoginComponent},
        {path: 'register', component: RegisterComponent},
        {path: 'forget-password', component: ForgetPasswordComponent}
      ]
  },
  {path: 'user', component: UserSettingsComponent, canActivate: [AuthRequiredGuard]},
  {path: 'create', component: TournamentCreatorComponent, canActivate: [AuthRequiredGuard]},
  {path: 'tournaments', component: TournamentsComponent},
  {path: 'cli', component: CliComponent},
  {path: 'tournaments/:id', redirectTo: 'tournaments/:id/dashboard', pathMatch: 'full'},
  {path: 'tournaments/:id/dashboard', component: TournamentDashboardComponent},
  {
    path: 'verification', canActivate: [VerificationComponentGuard], children: [
      {path: 'account', component: AccountVerificationComponent},
      {path: 'password', component: PasswordVerificationComponent},
      {path: 'tournament-invitation', component: TournamentInviteVerificationComponent},
      {
        path: 'tournament-participation-request', canActivate: [AuthRequiredGuard],
        component: TournamentParticipationRequestVerificationComponent
      },
      {path: 'email', component: EmailVerificationComponent}
    ]
  }
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class AppRoutingModule {
}
