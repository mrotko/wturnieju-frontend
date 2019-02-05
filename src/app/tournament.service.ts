import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameFixtureDto, ScheduleDto, TournamentDTO, TournamentTableDTO, UserTournamentsDTO} from './model/model';
import {RequestUrl} from './config/requestUrl';


export interface UpdateTournamentStatusDTO {
  tournamentId: string;
  status: 'START' | 'END';
}

@Injectable()
export class TournamentService implements OnInit {


  constructor(
    private http: HttpClient
  ) {
  }

  ngOnInit(): void {

  }

  getAllUserTournaments(userId: string): Observable<UserTournamentsDTO> {
    return this.http.get<UserTournamentsDTO>(RequestUrl.tournament.user + userId);
  }

  getTournament(tournamentId: string): Observable<TournamentDTO> {
    return this.http.get<TournamentDTO>(RequestUrl.tournament.tournament + tournamentId);
  }

  updateTournament(updateDto: UpdateTournamentStatusDTO): Observable<TournamentDTO> {
    return this.http.put<TournamentDTO>(RequestUrl.tournament.tournament + updateDto.tournamentId, updateDto);
  }

  getTournamentTable(tournamentId: string, groupId: string): Observable<TournamentTableDTO> {
    return this.http.get<TournamentTableDTO>(RequestUrl.tournament.tournament + tournamentId + '/table/' + groupId);
  }

  generateSchedule(tournamentId: string, groupId: string): Observable<ScheduleDto> {
    return this.http.get<ScheduleDto>(RequestUrl.tournament.tournament + tournamentId + '/schedule/generate/' + groupId);
  }

  getFutureGamesSchedule(tournamentId: string): Observable<ScheduleDto []> {
    return this.http.get<ScheduleDto []>(RequestUrl.tournament.tournament + tournamentId + '/schedule?game_status=BEFORE_START');
  }

  getEndedGamesSchedule(tournamentId: string): Observable<ScheduleDto []> {
    return this.http.get<ScheduleDto []>(RequestUrl.tournament.tournament + tournamentId + '/schedule?game_status=ENDED');
  }

  getGameFixture(tournamentId: string): Observable<GameFixtureDto []> {
    return this.http.get<GameFixtureDto []>(RequestUrl.tournament.tournament + tournamentId + '/game-fixtures');
  }

  getInProgressGamesSchedule(tournamentId: string): Observable<ScheduleDto []> {
    return this.http.get<ScheduleDto []>(RequestUrl.tournament.tournament + tournamentId + '/schedule?game_status=IN_PROGRESS');
  }

  saveSchedule(tournamentId: string, schedule: ScheduleDto): Observable<ScheduleDto> {
    return this.http.put<ScheduleDto>(RequestUrl.tournament.tournament + tournamentId + '/schedule', schedule);
  }

  getPublicTournamentsIds(): Observable<string []> {
    return this.http.get<string []>(RequestUrl.tournament.tournament, {
      params: {
        access: 'PUBLIC'
      }
    });
  }
}
