import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FixtureDTO, FixtureStatus, Profile, TournamentDTO, Tuple2} from '../model/model';
import {LocaleMessages} from '../locale-messages';
import {TournamentService} from '../tournament.service';

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

  fixtureStatus = FixtureStatus;

  lm = LocaleMessages;

  roundFixtures: { key: number, value: FixtureDTO[] };

  timetableColumns = ['date', 'firstPlayer', 'firstPlayerResult', 'divider', 'secondPlayerResult', 'secondPlayer', 'action'];

  roundToTimetableRows: RoundToTimetableRows [] = timetableMock;

  constructor(
    private tournamentService: TournamentService) {
  }

  ngOnInit() {
    for (const round of this.roundToTimetableRows) {
      for (const timetableRow of round.timetableRows) {
        timetableRow.players.left.id = this.tournament.participants[0].id;
        timetableRow.players.right.id = this.tournament.participants[1].id;
        timetableRow.winnerId = this.tournament.participants[0].id;
      }
    }

    this.roundFixtures = {} as { key: number, value: FixtureDTO[]; };
    this.tournamentService.getRoundsToFixtures(this.tournament.id).subscribe(roundsToFixturesDTO => {
      for (const dto of roundsToFixturesDTO) {
        this.roundFixtures[dto.round] = dto.fixtures;
      }
      console.log(this.roundFixtures);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  prepareNextRound() {
    this.tournamentService.prepareNextRound(this.tournament.id).subscribe(response => {
      console.log(response);
    });
  }

  getFullName(profile: Profile): string {
    const participant = this.tournament.participants.find(p => p.id === profile.id);
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
      row.winnerId = dto.winner;
      row.fixtureStatus = dto.fixtureStatus;
      row.action = ActionType.NONE;
    });
  }

  cancelEditFixture(row: TimetableRow) {
    console.log(row.result);
    console.log(row.resultTemp);
    row.result = row.resultTemp;
    row.resultTemp = null;
    row.action = ActionType.ACTION_ACTIVE;
  }
}

const timetableMock: RoundToTimetableRows [] = [
  {
    round: 1,
    timetableRows: [
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '1',
        date: new Date(),
        players: {left: {id: '1'}, right: {id: '2'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.NONE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '2',
        date: new Date(),
        players: {left: {id: '2'}, right: {id: '3'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.NONE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '3',
        date: new Date(),
        players: {left: {id: '3'}, right: {id: '4'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.NONE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '4',
        date: new Date(),
        players: {left: {id: '4'}, right: {id: '5'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.NONE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '5',
        date: new Date(),
        players: {left: {id: '5'}, right: {id: '6'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.NONE,
      }
    ]
  },
  {
    round: 2,
    timetableRows: [
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '1',
        date: new Date(),
        players: {left: {id: '1'}, right: {id: '2'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.NONE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '2',
        date: new Date(),
        players: {left: {id: '2'}, right: {id: '3'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '3',
        date: new Date(),
        players: {left: {id: '3'}, right: {id: '4'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '4',
        date: new Date(),
        players: {left: {id: '4'}, right: {id: '5'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '5',
        date: new Date(),
        players: {left: {id: '5'}, right: {id: '6'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      }
    ]
  },
  {
    round: 3,
    timetableRows: [
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '1',
        date: new Date(),
        players: {left: {id: '1'}, right: {id: '2'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '2',
        date: new Date(),
        players: {left: {id: '2'}, right: {id: '3'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '3',
        date: new Date(),
        players: {left: {id: '3'}, right: {id: '4'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '4',
        date: new Date(),
        players: {left: {id: '4'}, right: {id: '5'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '5',
        date: new Date(),
        players: {left: {id: '5'}, right: {id: '6'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      }
    ]
  },
  {
    round: 4,
    timetableRows: [
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '1',
        date: new Date(),
        players: {left: {id: '1'}, right: {id: '2'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '2',
        date: new Date(),
        players: {left: {id: '2'}, right: {id: '3'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      },
      {
        fixtureStatus: FixtureStatus.FIRST_PLAYER_WON,
        fixtureId: '3',
        date: new Date(),
        players: {left: {id: '3'}, right: {id: '4'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      },
      {
        fixtureStatus: FixtureStatus.FIRST_PLAYER_WON,
        fixtureId: '4',
        date: new Date(),
        players: {left: {id: '4'}, right: {id: '5'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        fixtureId: '5',
        date: new Date(),
        players: {left: {id: '5'}, right: {id: '6'}},
        winnerId: '',
        result: {left: 0, right: 1},
        action: ActionType.ACTION_ACTIVE,
      }
    ]
  }
];
