import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HelloWorldComponent} from './hello-world/hello-world.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {HelloWorldService} from './service/hello-world.service';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {AuthComponent} from './auth/auth.component';
import {ForgetPasswordComponent} from './auth/forget-password/forget-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './service/auth.service';
import {JwtInterceptor} from './helper/jwt.interceptor';
import {ErrorInterceptor} from './helper/error.interceptor';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {UserSettingsComponent} from './user-settings/user-settings.component';
import {AuthRequiredGuard} from './guard/auth-required.guard';
import {CanActivateAuthComponentGuard} from './guard/can-activate-auth-component.guard';
import {TournamentCreatorComponent} from './tournament-creator/tournament-creator.component';
import {TournamentCreatorService} from './service/tournament-creator.service';
import {MapToArrayPipe} from './pipe/map-to-array.pipe';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateStore} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfigService} from './service/config.service';
import {DefaultMissingTranslationHandler} from './default-missing-translation-handler';
import {TournamentDashboardComponent} from './tournament-dashboard/tournament-dashboard.component';
import {TournamentsComponent} from './my-tournaments/tournaments.component';
import {LocaleService} from './service/locale.service';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {TournamentService} from './tournament.service';
import {TournamentTableComponent} from './tournament-table/tournament-table.component';
import {ParticipantsComponent} from './participants/participants.component';
import {FixturePlannerComponent} from './fixture-planner/fixture-planner.component';
import {TournamentParticipantsService} from './tournament-participants.service';
import {TournamentTimetableComponent} from './tournament-timetable/tournament-timetable.component';
import {PrepareTournamentRoundFixturesDialogComponent} from './prepare-tournament-round-fixtures-dialog/prepare-tournament-round-fixtures-dialog.component';
import {CliComponent} from './cli/cli.component';
import {VerificationComponent} from './verification/verification.component';
import {AccountVerificationComponent} from './account-verification/account-verification.component';
import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {PasswordVerificationComponent} from './password-verification/password-verification.component';

registerLocaleData(localePl);

library.add(fas);

const appRoutes: Routes = [
  {path: 'hello-world', component: HelloWorldComponent},
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
  {path: 'tournaments/:id/dashboard', component: TournamentDashboardComponent},
  {
    path: 'verification', children: [
      {path: 'account', component: AccountVerificationComponent},
      {path: 'password', component: PasswordVerificationComponent},
      {path: 'email', component: EmailVerificationComponent}
    ]
  }
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    HomeComponent,
    ProfileComponent,
    TopMenuComponent,
    AuthComponent,
    UserSettingsComponent,
    TournamentCreatorComponent,
    MapToArrayPipe,
    TournamentDashboardComponent,
    TournamentsComponent,
    TournamentTableComponent,
    ParticipantsComponent,
    FixturePlannerComponent,
    TournamentTimetableComponent,
    PrepareTournamentRoundFixturesDialogComponent,
    CliComponent,
    VerificationComponent,
    AccountVerificationComponent,
    EmailVerificationComponent,
    PasswordVerificationComponent
  ],
  entryComponents: [
    PrepareTournamentRoundFixturesDialogComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: DefaultMissingTranslationHandler},
      useDefaultLang: false
    }),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [
    HelloWorldService,
    AuthRequiredGuard,
    TranslateStore,
    ConfigService,
    CanActivateAuthComponentGuard,
    AuthService,
    TournamentCreatorService,
    MapToArrayPipe,
    LocaleService,
    TournamentService,
    TournamentParticipantsService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {
      provide: LOCALE_ID,
      deps: [LocaleService],
      useFactory: localeService => localeService.getCurrentLocaleInstant().code
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
