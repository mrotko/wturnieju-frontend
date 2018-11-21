import {Component, Input, OnInit} from '@angular/core';
import {LocaleMessages} from '../locale-messages';
import {TournamentParticipantsService} from '../tournament-participants.service';
import {PARTICIPANT_STATUS, TOURNAMENT_STATUS, TournamentDTO} from '../model/model';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SearchService} from '../search.service';
import {TournamentService} from '../tournament.service';


interface ParticipantItem {
  id: string;
  position: number;
  name: string;
  confirmed?: boolean;
}

interface AutocompleteOption {
  id: string;
  name: string;
}

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  lm = LocaleMessages;

  @Input() tournamentId: string;

  searchFormControl = new FormControl();

  searchAutocompleteOptions: Observable<AutocompleteOption []>;

  tournament: TournamentDTO;

  participants: ParticipantItem [];

  selectedUserId: string;

  constructor(
    private tournamentService: TournamentService,
    private tournamentParticipantsService: TournamentParticipantsService,
    private searchService: SearchService
  ) {
  }

  isSearchVisible(): boolean {
    return this.countConfirmedParticipants() < this.tournament.maxParticipants && this.tournament.status === TOURNAMENT_STATUS.BEFORE_START;
  }

  countConfirmedParticipants(): number {
    let counter = 0;
    this.participants
      .filter(pItem => pItem.confirmed)
      .forEach(() => counter = counter + 1);
    return counter;
  }


  ngOnInit() {
    this.tournamentService.getTournament(this.tournamentId).subscribe(dto => this.tournament = dto);
    this.initAutocompleteOptions();
    this.prepareParticipants();
  }

  private initAutocompleteOptions() {
    this.searchFormControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.prepareAutocompleteOptions(value))
      ).subscribe(options => this.searchAutocompleteOptions = options);
  }

  private prepareParticipants() {
    this.tournamentParticipantsService.getParticipants(this.tournamentId)
      .pipe(map((dtos): ParticipantItem [] => {
        return dtos.map((dto, index): ParticipantItem => {
          return {
            id: dto.id,
            position: index + 1,
            name: dto.fullName,
            confirmed: (dto.participantStatus !== PARTICIPANT_STATUS.INVITED)
          };
        });
      })).subscribe(participants => this.participants = participants);
  }

  inviteParticipant(participantId?: string) {
    if (participantId || this.selectedUserId) {
      this.tournamentParticipantsService.invite(this.tournamentId, participantId || this.selectedUserId).subscribe(() => {
        this.selectedUserId = null;

        for (let i = 0; i < this.participants.length; i++) {
          if (this.participants[i].id === participantId) {
            this.participants.splice(i, 1);
          }
        }

        this.refresh();
      });
    }
  }

  refresh() {
    this.prepareParticipants();
  }

  getParticipantsIds(): string [] {
    if (this.participants) {
      return this.participants.map(participant => participant.id);
    }
    return [];
  }

  prepareAutocompleteOptions(query: string): Observable<AutocompleteOption []> {
    return this.searchService.findUsers(query.toLowerCase(), null, this.getParticipantsIds())
      .pipe(map((users): AutocompleteOption [] => {
        return users.map((user): AutocompleteOption => {
          return {
            id: user.id,
            name: user.fullName
          };
        });
      }));
  }
}

// const ParticipantsMock: ParticipantItem [] = [
//   {id: '1', position: 1, name: 'John Smith', confirmed: true},
//   {id: '2', position: 2, name: 'Ann Smith', confirmed: false},
//   {id: '3', position: 3, name: 'Kal-El', confirmed: false}
// ];
