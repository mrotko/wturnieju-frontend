import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {AuthService} from '../service/auth.service';
import {SnackBarService} from '../snack-bar.service';
import {LocaleMessages} from '../locale-messages';
import {Router} from '@angular/router';
import {RouterUrl} from '../config/routerUrl';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackbarService: SnackBarService,
    private router: Router,
    private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      if (error.headers.get("AuthAction") === "LOGOUT") {
        if (error.headers.get("LogoutReason") === "TOKEN") {
          this.snackbarService.openError(LocaleMessages.loggedOutToken);
        } else {
          this.snackbarService.openError(LocaleMessages.loggedOut);
        }
        this.authService.logout();
      } else if (error.status === 403) {
        this.snackbarService.openError(LocaleMessages.forbidden);
        this.router.navigate([RouterUrl.home]);
      }
      return throwError(error);
    }));
  }

}
