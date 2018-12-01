import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Fixture, FixtureStatus, Profile, TournamentDTO, Tuple2} from '../model/model';
import {LocaleMessages} from '../locale-messages';
import {TournamentService} from '../tournament.service';

interface TimetableRow {
  editMode: boolean;
  fixtureStatus: FixtureStatus;
  fixtureId: string;
  date: Date;
  players: Tuple2<Profile, Profile>;
  result: Tuple2<number, number>;
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

  lm = LocaleMessages;

  roundFixtures: { key: number, value: Fixture[] };

  timetableColumns = ['date', 'firstPlayer', 'firstPlayerResult', 'divider', 'secondPlayerResult', 'secondPlayer', 'action'];

  roundToTimetableRows: RoundToTimetableRows [] = timetableMock;

  constructor(
    private tournamentService: TournamentService) {
  }

  ngOnInit() {
    for (const round of this.roundToTimetableRows) {
      for (const timetableRow of round.timetableRows) {
        timetableRow.players.first.id = this.tournament.participants[0].id;
        timetableRow.players.second.id = this.tournament.participants[1].id;
      }
    }

    this.roundFixtures = {} as { key: number, value: Fixture[]; };
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

  editFixture(row: TimetableRow) {
    console.log(row);
  }

}

const timetableMock: RoundToTimetableRows [] = [
  {
    round: 1,
    timetableRows: [
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '1',
        date: new Date(),
        players: {first: {id: '1'}, second: {id: '2'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '2',
        date: new Date(),
        players: {first: {id: '2'}, second: {id: '3'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '3',
        date: new Date(),
        players: {first: {id: '3'}, second: {id: '4'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '4',
        date: new Date(),
        players: {first: {id: '4'}, second: {id: '5'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: true,
        fixtureId: '5',
        date: new Date(),
        players: {first: {id: '5'}, second: {id: '6'}},
        result: {first: 0, second: 1},
      }
    ]
  },
  {
    round: 2,
    timetableRows: [
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '1',
        date: new Date(),
        players: {first: {id: '1'}, second: {id: '2'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '2',
        date: new Date(),
        players: {first: {id: '2'}, second: {id: '3'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '3',
        date: new Date(),
        players: {first: {id: '3'}, second: {id: '4'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '4',
        date: new Date(),
        players: {first: {id: '4'}, second: {id: '5'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: true,
        fixtureId: '5',
        date: new Date(),
        players: {first: {id: '5'}, second: {id: '6'}},
        result: {first: 0, second: 1},
      }
    ]
  },
  {
    round: 3,
    timetableRows: [
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '1',
        date: new Date(),
        players: {first: {id: '1'}, second: {id: '2'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '2',
        date: new Date(),
        players: {first: {id: '2'}, second: {id: '3'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '3',
        date: new Date(),
        players: {first: {id: '3'}, second: {id: '4'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '4',
        date: new Date(),
        players: {first: {id: '4'}, second: {id: '5'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: true,
        fixtureId: '5',
        date: new Date(),
        players: {first: {id: '5'}, second: {id: '6'}},
        result: {first: 0, second: 1},
      }
    ]
  },
  {
    round: 4,
    timetableRows: [
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '1',
        date: new Date(),
        players: {first: {id: '1'}, second: {id: '2'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '2',
        date: new Date(),
        players: {first: {id: '2'}, second: {id: '3'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '3',
        date: new Date(),
        players: {first: {id: '3'}, second: {id: '4'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: false,
        fixtureId: '4',
        date: new Date(),
        players: {first: {id: '4'}, second: {id: '5'}},
        result: {first: 0, second: 1},
      },
      {
        fixtureStatus: FixtureStatus.BEFORE_START,
        editMode: true,
        fixtureId: '5',
        date: new Date(),
        players: {first: {id: '5'}, second: {id: '6'}},
        result: {first: 0, second: 1},
      }
    ]
  }
];
