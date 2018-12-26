import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestUrl} from './config/requestUrl';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(
    private http: HttpClient
  ) { }

  verifyEmailChange(token: string): Observable<any> {
    return this.http.patch(RequestUrl.verification.emailChange + token, null);
  }

  verifyAccount(token: string): Observable<any> {
    return this.http.patch(RequestUrl.verification.newAccount + token, null);
  }

  verifyResetPassword(token: string, password: string): Observable<any> {
    return this.http.patch(RequestUrl.verification.resetPassword + token, password);
  }
}
