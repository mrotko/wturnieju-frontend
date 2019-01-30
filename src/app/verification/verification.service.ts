import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RequestUrl} from '../config/requestUrl';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {

  constructor(
    private http: HttpClient
  ) {
  }

  verifyEmailChange(token: string): Observable<any> {
    return this.http.patch(RequestUrl.verification.emailChange + token, null);
  }

  verifyAccount(token: string): Observable<any> {
    return this.http.patch(RequestUrl.verification.newAccount + token, null);
  }

  verifyResetPassword(token: string, password: string): Observable<any> {
    return this.http.patch(RequestUrl.verification.resetPassword + token, password);
  }

  reactToTournamentInvitation(token: string, decision: boolean): Observable<boolean> {
    return this.http.patch<boolean>(RequestUrl.verification.tournamentInvitation + token, decision, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  addUserToTournamentParticipants(token: string, userId: string): Observable<any> {
    return this.http.patch(RequestUrl.verification.tournamentParticipationRequest + token, userId);
  }

  checkToken(token: string, service: string): Observable<boolean> {
    const url = RequestUrl.verification.checkToken
      .replace('{1}', token)
      .replace('{2}', service);
    return this.http.get<boolean>(url);
  }
}
