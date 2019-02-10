import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ParticipantDTO} from './model/model';
import {RequestUrl} from './config/requestUrl';

@Injectable()
export class TournamentParticipantsService {

  constructor(
    private http: HttpClient
  ) {
  }

  getParticipants(tournamentId: string): Observable<ParticipantDTO []> {
    return this.http.get<ParticipantDTO []>(RequestUrl.tournament.tournament + tournamentId + '/participants');
  }

  invite(tournamentId: string, invitedIds: string []): Observable<any> {
    if (!invitedIds) {
      invitedIds = [];
    }
    return this.http.post(RequestUrl.tournament.tournament + tournamentId + '/participants/', invitedIds);
  }

  remove(tournamentId: string, participantId: string): Observable<any> {
    return this.http.delete(RequestUrl.tournament.tournament + tournamentId + '/participants/' + participantId);
  }

  accept(tournamentId: string, participantId: string): Observable<any> {
    return this.http.patch(RequestUrl.tournament.tournament + tournamentId + '/participants/', participantId);
  }

  requestParticipation(tournamentId: string, userId: string): Observable<any> {
    return this.http.post(RequestUrl.tournament.tournament + tournamentId + '/users/' + userId + '/join', null);
  }
}
