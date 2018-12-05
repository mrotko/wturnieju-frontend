import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LocaleService} from '../service/locale.service';
import {Locale} from '../model/locale';
import {Subscription} from 'rxjs/internal/Subscription';
import {LocaleMessages} from '../locale-messages';
import {AuthService} from '../service/auth.service';
import {AuthorityType, User} from '../model/model';
import {RouterUrl} from '../config/routerUrl';
import {UserSettingsService} from '../user-settings.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit, OnDestroy {
  locales: Locale[];
  currentLocale: Locale;
  lm = LocaleMessages;
  currentUser: User;
  routerUrl = RouterUrl;



  currentLocaleSub: Subscription;
  userLogSubscription: Subscription;

  constructor(
    private translateService: TranslateService,
    private localeService: LocaleService,
    private authService: AuthService,
    private userSettingsService: UserSettingsService
    ) {
  }

  ngOnInit() {
    this.localeService.load();
    this.initLocales();
    this.initCurrentLocale();
    this.initCurrentUser();
  }

  private initLocales() {
    this.localeService.getLocales().subscribe(locales => this.locales = locales);
  }

  private initCurrentLocale() {
    this.currentLocaleSub = this.localeService.getCurrentLocale()
      .subscribe(locale => { this.currentLocale = locale; });
  }

  private initCurrentUser() {
    this.userLogSubscription = this.authService.isLoggedIn().subscribe(user => this.currentUser = user);
  }

  changeLocale(locale: Locale) {
    this.localeService.change(locale);
  }

  ngOnDestroy() {
    this.currentLocaleSub.unsubscribe();
    this.userLogSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

  showCliButton(): boolean {
    return this.userSettingsService.hasAuthority(AuthorityType.CLI);
  }
}
