import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocaleMessages} from '../locale-messages';
import {TournamentParticipantsService} from '../tournament-participants.service';
import {ParticipantStatus, TournamentDTO, TournamentStatus} from '../model/model';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {SearchService} from '../search.service';
import {TournamentService} from '../tournament.service';


interface ParticipantItem {
  id: string;
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

  searchFormControl = new FormControl();

  searchAutocompleteOptions: Observable<AutocompleteOption []>;

  @Input() tournament: TournamentDTO;

  @Output() reloadRequiredEvent: EventEmitter<boolean> = new EventEmitter();

  participants: ParticipantItem [] = [];

  selectedUserId: string;

  constructor(
    private tournamentService: TournamentService,
    private tournamentParticipantsService: TournamentParticipantsService,
    private searchService: SearchService
  ) {
  }

  isSearchVisible(): boolean {
    return this.participants.length < this.tournament.maxParticipants && this.tournament.status === TournamentStatus.BEFORE_START;
  }

  ngOnInit() {
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
    this.tournamentParticipantsService.getParticipants(this.tournament.id)
      .pipe(map((dtos): ParticipantItem [] => {
        return dtos.map((dto): ParticipantItem => {
          return {
            id: dto.id,
            name: dto.name,
            confirmed: (dto.participantStatus !== ParticipantStatus.INVITED)
          };
        });
      })).subscribe(participants => {
      this.participants = participants;
      this.initAutocompleteOptions();
    });
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