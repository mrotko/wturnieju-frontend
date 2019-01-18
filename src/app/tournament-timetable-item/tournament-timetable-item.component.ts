import {Component, Input, OnInit} from '@angular/core';
import {Tuple2} from '../model/model';

export interface TeamData {
  teamId: string;
  name: string;
  winner: boolean;
  currentResult: number;
  periodsResult: Tuple2<number, number> [];
}
@Component({
  selector: 'app-tournament-timetable-item',
  templateUrl: './tournament-timetable-item.component.html',
  styleUrls: ['./tournament-timetable-item.component.scss']
})
export class TournamentTimetableItemComponent implements OnInit {

  @Input() date: Date;

  @Input() shortDate: boolean = false;

  @Input() homeTeamData: TeamData;

  @Input() awayTeamData: TeamData;

  @Input() bye: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  getTeams(): TeamData [] {
    if (this.bye) {
      return [this.homeTeamData, {
        name: '',
        periodsResult: [],
        winner: null,
        teamId: null,
        currentResult: null
      }]
    }
    return [this.homeTeamData, this.awayTeamData];
  }
}
