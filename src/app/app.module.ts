import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './home/home.component';
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
import {TournamentParticipantsService} from './tournament-participants.service';
import {TournamentTimetableComponent} from './tournament-timetable/tournament-timetable.component';
import {TournamentScheduleDialogComponent} from './prepare-tournament-round-fixtures-dialog/tournament-schedule-dialog.component';
import {CliComponent} from './cli/cli.component';
import {VerificationComponent} from './verification/verification.component';
import {AccountVerificationComponent} from './account-verification/account-verification.component';
import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {PasswordVerificationComponent} from './password-verification/password-verification.component';
import {TournamentParticipantsConfigurationComponent} from './tournament-participants-configuration/tournament-participants-configuration.component';
import {FloatingButtonComponent} from './floating-button/floating-button.component';
import {InviteTournamentParticipantPopupComponent} from './invite-tournament-participant-popup/invite-tournament-participant-popup.component';
import {ParticipantComponent} from './participant/participant.component';
import {TournamentInviteVerificationComponent} from './tournament-invite-verification/tournament-invite-verification.component';
import {TournamentParticipationRequestVerificationComponent} from './tournament-participation-request-verification/tournament-participation-request-verification.component';
import {ClipboardModule} from 'ngx-clipboard';
import {ParticipantsProgressBarComponent} from './participants-progress-bar/participants-progress-bar.component';
import {TournamentTimetableItemComponent} from './tournament-timetable-item/tournament-timetable-item.component';
import {AppRoutingModule} from './app-routing.module';
import {GameEditorModule} from './game-editor/game-editor.module';
import {SharedModule} from './shared.module';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';
import { TournamentScheduleComponent } from './tournament-schedule/tournament-schedule.component';

registerLocaleData(localePl);

library.add(fas);


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    HomeComponent,
    TopMenuComponent,
    AuthComponent,
    UserSettingsComponent,
    TournamentCreatorComponent,
    MapToArrayPipe,
    TournamentDashboardComponent,
    TournamentsComponent,
    TournamentTableComponent,
    ParticipantsComponent,
    TournamentTimetableComponent,
    TournamentScheduleDialogComponent,
    CliComponent,
    VerificationComponent,
    FloatingButtonComponent,
    AccountVerificationComponent,
    EmailVerificationComponent,
    PasswordVerificationComponent,
    TournamentParticipantsConfigurationComponent,
    InviteTournamentParticipantPopupComponent,
    ParticipantComponent,
    TournamentInviteVerificationComponent,
    TournamentParticipationRequestVerificationComponent,
    ParticipantsProgressBarComponent,
    TournamentTimetableItemComponent,
    FilterMenuComponent,
    TournamentScheduleComponent
  ],
  entryComponents: [
    TournamentScheduleDialogComponent,
    InviteTournamentParticipantPopupComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: DefaultMissingTranslationHandler},
      useDefaultLang: false
    }),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ClipboardModule,
    GameEditorModule,
    SharedModule
  ],
  providers: [
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
