import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchResultDto, TournamentSearchDto, UserDTO} from './model/model';
import {RequestUrl} from './config/requestUrl';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) {
  }

  // TODO replace special char inside query like %20 is space

  findUsers(query: string, limit ?: number, excluded ?: string []): Observable<UserDTO []> {
    return this.http.get<UserDTO []>(RequestUrl.search.user + query +
      this.buildLimit(limit) +
      this.buildExcluded(excluded)
    );
  }

  findTournaments(query: string, limit ?: number): Observable<SearchResultDto<TournamentSearchDto>> {
    let params = new HttpParams()
      .append('q', query);
    
    if (limit) {
      params.append('limit', limit.toString());
    }

    return this.http.get<SearchResultDto<TournamentSearchDto>>(RequestUrl.search.tournament, {
      params: params
    });
  }

  private buildLimit(limit: number) {
    return (limit ? ('&limit=' + limit) : '');
  }

  private buildExcluded(excluded: string []) {
    return (excluded ? ('&excluded=' + excluded.join(',')) : '');
  }
}
