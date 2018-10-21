import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TournamentCreatorConfig} from '../model/model';
import {RequestUrl} from '../config/requestUrl';

@Injectable({
  providedIn: 'root'
})
export class TournamentCreatorService {

  constructor(
    private http: HttpClient
  ) { }

  getConfig(): Observable<TournamentCreatorConfig> {
    return this.http.get<TournamentCreatorConfig>(RequestUrl.tournamentCreator.config);
  }
}
