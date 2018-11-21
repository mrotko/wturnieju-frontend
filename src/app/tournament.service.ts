import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoundToFixturesDTO, TournamentDTO, UserTournamentsDTO} from './model/model';
import {RequestUrl} from './config/requestUrl';

@Injectable()
export class TournamentService implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  getAllUserTournaments(userId: string): Observable<UserTournamentsDTO> {
    return this.http.get<UserTournamentsDTO>(RequestUrl.tournament.user + userId);
  }

  ngOnInit(): void {

  }

  getRoundsToFixtures(tournamentId: string): Observable<RoundToFixturesDTO []> {
    return this.http.get<RoundToFixturesDTO []>(RequestUrl.tournament.tournament + tournamentId + '/roundToFixtures');
  }

  getTournament(tournamentId: string): Observable<TournamentDTO> {
    return this.http.get<TournamentDTO>(RequestUrl.tournament.tournament + tournamentId);
  }
}
