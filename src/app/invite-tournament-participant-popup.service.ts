import {SearchService} from './search.service';
import {Observable} from 'rxjs';
import {UserDTO} from './model/model';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InviteTournamentParticipantPopupService {

  constructor(private searchService: SearchService) {
  }

  findUsers(query: string): Observable<UserDTO []> {
    return this.searchService.findUsers(query);
  }
}
