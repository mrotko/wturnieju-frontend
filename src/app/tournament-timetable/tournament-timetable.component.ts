import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TournamentDTO, Tuple2} from '../model/model';
import {LocaleMessages} from '../locale-messages';
import {TeamData} from '../tournament-timetable-item/tournament-timetable-item.component';

@Component({
  selector: 'app-tournament-timetable',
  templateUrl: './tournament-timetable.component.html',
  styleUrls: ['./tournament-timetable.component.scss']
})
export class TournamentTimetableComponent implements OnInit, OnChanges {

  @Input() tournament: TournamentDTO;

  @Output() reloadRequiredEvent: EventEmitter<boolean> = new EventEmitter();

  @Input() title: string;

  lm = LocaleMessages;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getMockItems(): Tuple2<TeamData, TeamData> [] {
    return [
      {
        left: {
          name: 'liverpool',
          winner: true,
          currentResult: 3,
          periodsResult: [1, 2],
          teamId: '123',
        },
        right: {
          name: 'man city',
          winner: false,
          currentResult: 1,
          periodsResult: [1, 0],
          teamId: '123',
        }
      }, {
        left: {
          name: 'ars',
          winner: false,
          currentResult: 0,
          periodsResult: [0, 0],
          teamId: '123',
        },
        right: {
          name: 'che',
          winner: false,
          currentResult: 0,
          periodsResult: [0, 0],
          teamId: '123',
        }
      }, {
        left: {
          name: 'whu',
          winner: false,
          currentResult: 2,
          periodsResult: [1, 1],
          teamId: '123',
        },
        right: {
          name: 'tot',
          winner: true,
          currentResult: 3,
          periodsResult: [1, 2],
          teamId: '123',
        }
      }
    ]
  }
}
