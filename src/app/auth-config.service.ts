import {Injectable} from '@angular/core';
import {AuthConfigDto} from './model/model';
import {Observable, Subject} from 'rxjs';
import {AuthService} from './service/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {SnackBarService} from './snack-bar.service';
import {LocaleMessages} from './locale-messages';

@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {

  private authConfig: AuthConfigDto;

  private authConfigLoadedSubject: Subject<boolean> = new Subject();

  constructor(
    private authService: AuthService,
    private snackbarService: SnackBarService,
    private translate: TranslateService,
  ) {
  }

  public init(): Observable<boolean> {
    this.authService.getAuthConfig().subscribe(config => {
        this.authConfig = config;
        this.authConfigLoadedSubject.next(true);
      },
      () => {
        this.authConfigLoadedSubject.next(false);
        this.snackbarService.openError(LocaleMessages.unknownError);
      }
    );
    return this.authConfigLoadedSubject;
  }

  public getPasswordPatterErrMsg(password: string) {
    return this.authConfig.passwordPatternGroups
      .filter(group => !password.match(group.pattern))
      .map(group => this.translate.instant(group.patternGroupType))
      .join(", ").toLowerCase();
  }

  public getPasswordPattern(): string {
    return this.authConfig.passwordPatternGroups
      .map(g => g.pattern)
      .join("");
  }
}
