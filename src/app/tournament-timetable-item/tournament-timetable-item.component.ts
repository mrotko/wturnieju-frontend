import {Component, Input, OnInit} from '@angular/core';
import {Tuple2} from '../model/model';

export interface ParticipantData {
  participantId: string;
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

  @Input() homeParticipantData: ParticipantData;

  @Input() awayParticipantData: ParticipantData;

  @Input() bye: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  getParticipants(): ParticipantData [] {
    if (this.bye) {
      return [this.homeParticipantData, {
        name: '',
        periodsResult: [],
        winner: null,
        participantId: null,
        currentResult: null
      }]
    }
    return [this.homeParticipantData, this.awayParticipantData];
  }
}
