import {Component, Input, OnInit} from '@angular/core';

export interface TeamData {
  teamId: string;
  name: string;
  winner: boolean;
  currentResult: number;
  periodsResult: number [];
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

  constructor() { }

  ngOnInit() {
  }

  getTeams(): TeamData [] {
    return [this.homeTeamData, this.awayTeamData];
  }
}
