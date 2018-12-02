import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FixtureDTO, FixtureStatus, Profile, TournamentDTO, Tuple2} from '../model/model';
import {LocaleMessages} from '../locale-messages';
import {TournamentService} from '../tournament.service';
import {MapToArrayPipe} from '../pipe/map-to-array.pipe';

enum ActionType {
  EDIT_MODE,
  ACTION_ACTIVE,
  NONE
}

interface TimetableRow {
  fixtureStatus: FixtureStatus;
  fixtureId: string;
  date: Date;
  players: Tuple2<Profile, Profile>;
  winnerId?: string;
  result: Tuple2<number, number>;
  resultTemp?: Tuple2<number, number>;
  action: ActionType;
}

interface RoundToTimetableRows {
  round: number;
  timetableRows: TimetableRow[];
}

@Component({
  selector: 'app-tournament-timetable',
  templateUrl: './tournament-timetable.component.html',
  styleUrls: ['./tournament-timetable.component.scss']
})
export class TournamentTimetableComponent implements OnInit, OnChanges {

  @Input() tournament: TournamentDTO;

  @Output() reloadRequiredEvent: EventEmitter<boolean> = new EventEmitter();

  lm = LocaleMessages;

  timetableColumns = ['date', 'firstPlayer', 'firstPlayerResult', 'divider', 'secondPlayerResult', 'secondPlayer', 'action'];

  roundToTimetableRows: RoundToTimetableRows [];

  constructor(
    private tournamentService: TournamentService,
    private mapToArray: MapToArrayPipe
  ) {
  }

  ngOnInit() {
  }

  private initTable() {
    let tempRows: RoundToTimetableRows [] = [];
    this.tournamentService.getRoundsToFixtures(this.tournament.id).subscribe(roundsToFixturesDTO => {
      for (const dto of this.mapToArray.transform(roundsToFixturesDTO)) {
        console.log(dto);
        let rows: TimetableRow [] = [];
        for (const fixture of dto.right) {
          rows.push({
            fixtureStatus: fixture.fixtureStatus,
            winnerId: fixture.winnerId,
            result: fixture.result,
            fixtureId: fixture.id,
            resultTemp: null,
            players: fixture.playersIds,
            date: fixture.timestamp,
            action: this.determineActionType(fixture)
          });
        }
        tempRows.push({
          round: dto.left,
          timetableRows: rows
        });
      }
      this.roundToTimetableRows = tempRows;
    });
  }

  determineActionType(fixture: FixtureDTO): ActionType {
    if (fixture.status === FixtureStatus.ENDED) {
      return ActionType.NONE;
    }
    return ActionType.ACTION_ACTIVE;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initTable();
  }

  getFullName(profileId: string): string {
    const participant = this.tournament.participants.find(p => p.id === profileId);
    return participant ? participant.fullName : '';
  }

  isActionActive(row: TimetableRow): boolean {
    return row.action === ActionType.ACTION_ACTIVE;
  }

  isEditMode(row: TimetableRow): boolean {
    return row.action === ActionType.EDIT_MODE;
  }

  startEditFixture(row: TimetableRow) {
    row.resultTemp = {left: row.result.left, right: row.result.right};
    row.action = ActionType.EDIT_MODE;
  }

  confirmFixtureChange(row: TimetableRow) {
    this.tournamentService.updateFixtureResult(this.tournament.id, row.fixtureId, row.result).subscribe(dto => {
      row.resultTemp = null;
      row.result = dto.result;
      row.winnerId = dto.winnerId;
      row.fixtureStatus = dto.status;
      row.action = ActionType.NONE;
      this.reloadRequiredEvent.emit(true);
    });
  }

  cancelEditFixture(row: TimetableRow) {
    console.log(row.result);
    console.log(row.resultTemp);
    row.result = row.resultTemp;
    row.resultTemp = null;
    row.action = ActionType.ACTION_ACTIVE;
  }

  checkResultValidity(row: TimetableRow): boolean {
    return row.result.left && row.result.right;
  }
}
