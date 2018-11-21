import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TournamentService} from '../tournament.service';
import {Fixture, Profile, TournamentDTO, TournamentTableDTO, Tuple2} from '../model/model';
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

  roundsBoundary: Tuple2<number, number>;

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
    this.updateRoundsBoundaries();
    this.refreshTournamentTable();
    this.currentRound = 1;
  }

  updateRoundsBoundaries() {
    const min = 1;
    const max = this.mapToArray.transform(this.roundFixtures).map((tuple: Tuple2<number, any>) => tuple.first).length;

    if (min <= max) {
      this.roundsBoundary = {first: min, second: max};
    }
  }

  isNextRound(): boolean {
    if (!this.roundsBoundary) { return false; }
    return this.currentRound < this.roundsBoundary.second;
  }

  isPrevRound(): boolean {
    if (!this.roundsBoundary) { return false; }
    return this.currentRound > this.roundsBoundary.first;
  }

  showNextFixtures() {
    if (this.isNextRound()) {
      this.currentRound = this.currentRound + 1;
    }
  }

  showPrevFixtures() {
    if (this.isPrevRound()) {
      this.currentRound = this.currentRound - 1;
    }
  }

  refreshTournamentTable() {
    this.tournamentService.getTournamentTable(this.tournament.id).subscribe(dto => this.tournamentTable = dto);
  }

  getFullName(profile: Profile): string {
    console.log(this.tournamentTable);
    const participant = this.tournament.participants.find(p => p.id === profile.id);
    console.log(participant);
    return participant ? participant.fullName : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshTournamentTable();
  }
}
