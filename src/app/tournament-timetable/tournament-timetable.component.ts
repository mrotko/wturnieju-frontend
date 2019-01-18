import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TournamentDTO, Tuple2} from '../model/model';
import {LocaleMessages} from '../locale-messages';
import {TeamData} from '../tournament-timetable-item/tournament-timetable-item.component';
import {ObjectUtils} from '../utils/ObjectUtils';


export interface TimetableData {
  elements: TimetableElement [];
}

export interface TimetableElement {
  round: number;
  games: GameData [];
}

export interface GameData {
  date: Date;
  bye: boolean;
  teams: Tuple2<TeamData, TeamData>;
}

@Component({
  selector: 'app-tournament-timetable',
  templateUrl: './tournament-timetable.component.html',
  styleUrls: ['./tournament-timetable.component.scss']
})
export class TournamentTimetableComponent implements OnInit, OnChanges {

  @Input() tournament: TournamentDTO;

  @Output() reloadRequiredEvent: EventEmitter<boolean> = new EventEmitter();

  @Input() title: string;

  @Input() timetableData: TimetableData;

  lm = LocaleMessages;

  constructor(
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  isLoaded(): boolean {
    return ObjectUtils.exists(this.timetableData);
  }
}
