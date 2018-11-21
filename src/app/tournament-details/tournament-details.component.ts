import {Component, Input, OnInit} from '@angular/core';
import {TournamentService} from '../tournament.service';
import {Fixture, Tuple2} from '../model/model';
import {MapToArrayPipe} from '../pipe/map-to-array.pipe';

//
// interface TournamentTableRow {
//
// }

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss']
})
export class TournamentDetailsComponent implements OnInit {

  @Input() tournamentId: string;

  currentRound: number;

  roundsBoundary: Tuple2<number, number>;

  /*
  * TODO komponent zawiera aktualną tabelę i terminarz
  * w terminarzu można wprowadzać nowe wyniki
  *
  *
  * */

  roundFixtures: {key: number, value: Fixture[]};

  constructor(
    private tournamentService: TournamentService,
    private mapToArray: MapToArrayPipe,
  ) { }

  ngOnInit() {
    this.roundFixtures = {} as {key: number, value: Fixture[]};
      this.tournamentService.getRoundsToFixtures(this.tournamentId).subscribe(roundsToFixturesDTO => {
      roundsToFixturesDTO.forEach(dto => {
        this.roundFixtures[dto.round] = dto.fixtures;
      });
    });
    this.updateRoundsBoundaries();
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
}
