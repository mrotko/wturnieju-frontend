import {SearchService} from './search.service';
import {Observable} from 'rxjs';
import {UserDTO} from './model/model';

export class InviteTournamentParticipantPopupService {

  constructor(
    private searchService: SearchService,
    private currentParticipantsIds: string [],
    private ownerId: string
  ) { }

  findUsers(query: string, excludedIds: string []): Observable<UserDTO []> {
    if (!excludedIds) {
      excludedIds = [];
    }
    excludedIds = excludedIds.concat([this.ownerId]);
    excludedIds = excludedIds.concat(this.currentParticipantsIds);
    return this.searchService.findUsers(query, null, excludedIds);
  }
}
