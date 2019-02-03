import {Component, Input, OnInit} from '@angular/core';
import {ScheduleDto, ScheduleElementDto} from '../model/model';
import {ObjectUtils} from '../utils/ObjectUtils';
import {ParticipantData} from '../tournament-timetable-item/tournament-timetable-item.component';
import {MapToArrayPipe} from '../pipe/map-to-array.pipe';

@Component({
  selector: 'app-tournament-schedule',
  templateUrl: './tournament-schedule.component.html',
  styleUrls: ['./tournament-schedule.component.scss']
})
export class TournamentScheduleComponent implements OnInit {

  @Input() tournamentSchedule: ScheduleDto;

  constructor(
    private mapToArrayPipe: MapToArrayPipe
  ) {
  }

  ngOnInit() {
  }

  isComponentVisible() {
    return ObjectUtils.exists(this.tournamentSchedule) && this.tournamentSchedule.elements.length > 0;
  }

  getHomeParticipantData(element: ScheduleElementDto): ParticipantData {
    return {
      name: element.homeParticipant.name,
      participantId: element.homeParticipant.id,
      periodsResult: this.mapToArrayPipe.transform(element.homeScore.periods),
      currentResult: element.homeScore.current,
      winner: element.winner == 1
    }
  }

  getAwayParticipantData(element: ScheduleElementDto): ParticipantData {
    return {
      name: element.awayParticipant.name,
      participantId: element.awayParticipant.id,
      periodsResult: this.mapToArrayPipe.transform(element.awayScore.periods),
      currentResult: element.awayScore.current,
      winner: element.winner == 2
    }
  }
}
