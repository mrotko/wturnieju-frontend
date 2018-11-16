import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ConfigService} from './config.service';
import {Observable} from 'rxjs/internal/Observable';
import {Locale} from '../model/locale';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  currentLocale$ = new BehaviorSubject<Locale>(this.getLocaleFromStorage());

  constructor(
    private translateService: TranslateService,
    private configService: ConfigService) {
  }

  load() {
    const locale = this.getLocaleFromStorage();
    if (locale !== null && locale !== undefined) {
      this.change(locale);
    } else {
      this.getLocales()
        .pipe(map(locales => {
          const foundLocale = locales.find(l => l.code === this.translateService.getBrowserLang());
          if (foundLocale !== null && foundLocale !== undefined) {
            return foundLocale;
          } else {
            return locales.find(l => l.code === 'en-us');
          }
        }))
        .subscribe(l => this.change(l));
    }
  }

  getCurrentLocale(): Observable<Locale> {
    return this.currentLocale$.asObservable();
  }

  getCurrentLocaleInstant(): Locale {
    return this.currentLocale$.getValue();
  }

  change(locale: Locale) {
    this.setLocaleToStorage(locale);
    this.translateService.use(locale.code);
    this.currentLocale$.next(this.getLocaleFromStorage());
  }

  private setLocaleToStorage(locale: Locale) {
    localStorage.setItem('locale', JSON.stringify(locale));
  }

  private getLocaleFromStorage(): Locale {
    return JSON.parse(localStorage.getItem('locale'));
  }

  getLocales(): Observable<Locale[]> {
    return this.configService.loadLocale().pipe(map(locales => <Locale[]> locales));
  }
}
