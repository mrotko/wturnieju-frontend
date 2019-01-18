import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ScheduleDto, TournamentDTO, TournamentTableDTO, UserTournamentsDTO} from './model/model';
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

  getTournament(tournamentId: string): Observable<TournamentDTO> {
    return this.http.get<TournamentDTO>(RequestUrl.tournament.tournament + tournamentId);
  }

  updateTournament(updateDto: UpdateTournamentStatusDTO): Observable<TournamentDTO> {
    return this.http.put<TournamentDTO>(RequestUrl.tournament.tournament + updateDto.tournamentId, updateDto);
  }

  getTournamentTable(tournamentId: string): Observable<TournamentTableDTO> {
    return this.http.get<TournamentTableDTO>(RequestUrl.tournament.tournament + tournamentId + '/table');
  }

  generateSchedule(tournamentId: string): Observable<ScheduleDto> {
    return this.http.get<ScheduleDto>(RequestUrl.tournament.tournament + tournamentId + '/schedule/generate');
  }

  saveSchedule(tournamentId: string, schedule: ScheduleDto): Observable<ScheduleDto> {
    return this.http.put<ScheduleDto>(RequestUrl.tournament.tournament + tournamentId + '/schedule', schedule);
  }
}
