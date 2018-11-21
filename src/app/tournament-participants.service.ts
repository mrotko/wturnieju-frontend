import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TournamentParticipantDTO} from './model/model';
import {RequestUrl} from './config/requestUrl';

@Injectable()
export class TournamentParticipantsService {

  constructor(
    private http: HttpClient
  ) { }

  getParticipants(tournamentId: string): Observable<TournamentParticipantDTO []> {
    return this.http.get<TournamentParticipantDTO []>(RequestUrl.tournament.tournament + tournamentId + '/participants');
  }

  invite(tournamentId: string, participantId: string): Observable<any> {
    return this.http.post(RequestUrl.tournament.tournament + tournamentId + '/invite/' + participantId, {});
  }
}
