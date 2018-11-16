import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserTournamentsDTO} from './model/model';
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
}
