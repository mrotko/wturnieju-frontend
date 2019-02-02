import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TournamentCreatorConfigDto, TournamentTemplateDto} from '../model/model';
import {RequestUrl} from '../config/requestUrl';

@Injectable({
  providedIn: 'root'
})
export class TournamentCreatorService {

  constructor(
    private http: HttpClient
  ) {
  }

  getConfig(): Observable<TournamentCreatorConfigDto> {
    return this.http.get<TournamentCreatorConfigDto>(RequestUrl.tournamentCreator.config);
  }

  send<T extends TournamentTemplateDto>(tournamentCreatorData: T): Observable<any> {
    return this.http.post(RequestUrl.tournamentCreator.create, tournamentCreatorData);
  }
}
