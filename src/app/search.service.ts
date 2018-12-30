import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TournamentDTO, UserDTO} from './model/model';
import {RequestUrl} from './config/requestUrl';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
  ) { }

  // TODO replace special char inside query like %20 is space

  findUsers(query: string, limit ?: number, excluded ?: string []): Observable <UserDTO []> {
    return this.http.get<UserDTO []>(RequestUrl.search.user + query +
      this.buildLimit(limit) +
      this.buildExcluded(excluded)
    );
  }

  findTournaments(query: string, limit ?: number, excluded ?: string []) {
    this.http.get<TournamentDTO []>(RequestUrl.search.tournament + query +
      this.buildLimit(limit) +
      this.buildExcluded(excluded));
  }

  private buildLimit(limit: number) {
    return (limit ? ('&limit=' + limit) : '');
  }

  private buildExcluded(excluded: string []) {
    return (excluded ? ('&excluded=' + excluded.join(',')) : '');
  }
}
