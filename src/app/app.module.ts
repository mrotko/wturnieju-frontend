import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HelloWorldComponent} from './hello-world/hello-world.component';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HelloWorldService} from './service/hello-world.service';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {SharedModule} from './shared/shared.module';
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
  {path: 'user', component: UserSettingsComponent, canActivate: [AuthRequiredGuard]}
];
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
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    HelloWorldService,
    AuthRequiredGuard,
    CanActivateAuthComponentGuard,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
