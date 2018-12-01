import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TournamentService} from '../tournament.service';
import {Fixture, Profile, TournamentDTO, TournamentTableDTO} from '../model/model';
import {MapToArrayPipe} from '../pipe/map-to-array.pipe';
import {LocaleMessages} from '../locale-messages';


interface SwissTournamentTable {
  rows: SwissTournamentTableRow [];
}

interface SwissTournamentTableRow {
  position: number;
  profile: Profile;
  points: number;
  wins: number;
  draws: number;
  loses: number;
  smallPoints: number;
}

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss']
})
export class TournamentDetailsComponent implements OnInit, OnChanges {

  lm = LocaleMessages;

  @Input() tournament: TournamentDTO;

  currentRound: number;

  /*
  * TODO komponent zawiera aktualną tabelę i terminarz
  * w terminarzu można wprowadzać nowe wyniki
  *
  *
  * */

  roundFixtures: {key: number, value: Fixture[]};

  tournamentTable: TournamentTableDTO;

  swissTournamentColumns: string [] = ['position', 'fullName', 'points'];

  constructor(
    private tournamentService: TournamentService,
    private mapToArray: MapToArrayPipe,
  ) { }

  ngOnInit() {
    this.roundFixtures = {} as {key: number, value: Fixture[]};
    this.tournamentService.getRoundsToFixtures(this.tournament.id).subscribe(roundsToFixturesDTO => {
      roundsToFixturesDTO.forEach(dto => {
        this.roundFixtures[dto.round] = dto.fixtures;
      });
    });
    this.refreshTournamentTable();
    this.currentRound = 1;

    this.tournamentService.prepareNextRound(this.tournament.id).subscribe(response => {
      console.log(response);
    });
  }

  refreshTournamentTable() {
    this.tournamentService.getTournamentTable(this.tournament.id).subscribe(dto => this.tournamentTable = dto);
  }

  getFullName(profile: Profile): string {
    const participant = this.tournament.participants.find(p => p.id === profile.id);
    return participant ? participant.fullName : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshTournamentTable();
  }
}
