import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {LocaleMessages} from './locale-messages';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private lm = LocaleMessages;

  private baseConfig: MatSnackBarConfig = {
    duration: 5000,
    panelClass: 'success-snackbar',
  };

  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  openSuccess(translatableMessage: string, translatableAction?: string): MatSnackBarRef<SimpleSnackBar> {
    const successConfig = this.baseConfig;
    successConfig.panelClass = 'success-snackbar';

    return this.openSnackBar(translatableMessage, translatableAction, successConfig);
  }

  private openSnackBar(translatableMessage: string, translatableAction?: string, config?: MatSnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(this.translate.instant(translatableMessage), this.translate.instant(translatableAction || this.lm.close), config);
  }

  openInfo(translatableMessage: string, translatableAction?: string): MatSnackBarRef<SimpleSnackBar> {
    const infoConfig = this.baseConfig;
    infoConfig.panelClass = 'info-snackbar';

    return this.openSnackBar(translatableMessage, translatableAction, infoConfig);
  }

  openError(translatableMessage: string, translatableAction?: string): MatSnackBarRef<SimpleSnackBar> {
    const errorConfig = this.baseConfig;
    errorConfig.panelClass = 'error-snackbar';
    return this.openSnackBar(translatableMessage, translatableAction, errorConfig);
  }
}
