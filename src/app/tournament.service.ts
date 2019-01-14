import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  FixtureDTO,
  RoundToFixturesDTO,
  TournamentDTO,
  TournamentTableDTO,
  Tuple2,
  UserTournamentsDTO
} from './model/model';
import {RequestUrl} from './config/requestUrl';


export interface UpdateTournamentStatusDTO {
  tournamentId: string;
  status: 'START' | 'END';
}


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

  updateTournament(updateDto: UpdateTournamentStatusDTO): Observable<TournamentDTO> {
    return this.http.put<TournamentDTO>(RequestUrl.tournament.tournament + updateDto.tournamentId, updateDto);
  }

  getTournamentTable(tournamentId: string): Observable<TournamentTableDTO> {
    return this.http.get<TournamentTableDTO>(RequestUrl.tournament.tournament + tournamentId + '/table');
  }


  prepareNextRound(tournamentId: string): Observable<FixtureDTO []> {
    return this.http.get<FixtureDTO []>(RequestUrl.tournament.tournament + tournamentId + '/prepareNextRound');
  }

  confirmNextRound(tournamentId: string, fixtures: FixtureDTO []) {
    return this.http.post(RequestUrl.tournament.tournament + tournamentId + '/prepareNextRound', fixtures);
  }

  updateFixtureResult(tournamentId: string, fixtureId: string, result: Tuple2<number, number>): Observable<FixtureDTO> {
    return this.http.put<FixtureDTO>(RequestUrl.tournament.tournament + tournamentId + '/fixture/' + fixtureId + '/result', result);
  }

  getCurrentRound(tournamentId: string): Observable<number> {
    return this.http.get<number>(RequestUrl.tournament.tournament + tournamentId + '/currentRound');
  }
}
