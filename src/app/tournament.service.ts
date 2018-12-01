import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  Fixture,
  RoundToFixturesDTO,
  TournamentBundleUpdate,
  TournamentDTO,
  TournamentTableDTO,
  UserTournamentsDTO
} from './model/model';
import {RequestUrl} from './config/requestUrl';

@Injectable()
export class TournamentService implements OnInit {

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {

  }


  getAllUserTournaments(userId: string): Observable<UserTournamentsDTO> {
    return this.http.get<UserTournamentsDTO>(RequestUrl.tournament.user + userId);
  }

  getRoundsToFixtures(tournamentId: string): Observable<RoundToFixturesDTO []> {
    return this.http.get<RoundToFixturesDTO []>(RequestUrl.tournament.tournament + tournamentId + '/roundToFixtures');
  }

  getTournament(tournamentId: string): Observable<TournamentDTO> {
    return this.http.get<TournamentDTO>(RequestUrl.tournament.tournament + tournamentId);
  }

  updateTournament(bundle: TournamentBundleUpdate): Observable<TournamentDTO> {
    return this.http.put<TournamentDTO>(RequestUrl.tournament.tournament + bundle.tournamentId, bundle);
  }

  getTournamentTable(tournamentId: string): Observable<TournamentTableDTO> {
    return this.http.get<TournamentTableDTO>(RequestUrl.tournament.tournament + tournamentId + '/table');
  }

  prepareNextRound(tournamentId: string): Observable<Fixture []> {
    return this.http.get<Fixture []>(RequestUrl.tournament.tournament + tournamentId + '/prepareNextRound');
  }

  addNextRound(tournamentId: string, fixtures: Fixture []) {
    return this.http.post(RequestUrl.tournament.tournament + tournamentId + '/prepareNextRound', fixtures);
  }
}
