import {Component, Input, OnInit} from '@angular/core';
import {ScheduleDto, ScheduleElementDto} from '../model/model';
import {ObjectUtils} from '../utils/ObjectUtils';
import {TeamData} from '../tournament-timetable-item/tournament-timetable-item.component';
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

  getHomeTeamData(element: ScheduleElementDto): TeamData {
    return {
      name: element.homeTeam.name,
      teamId: element.homeTeam.id,
      periodsResult: this.mapToArrayPipe.transform(element.homeScore.periods),
      currentResult: element.homeScore.current,
      winner: element.winner == 1
    }
  }

  getAwayTeamData(element: ScheduleElementDto): TeamData {
    return {
      name: element.awayTeam.name,
      teamId: element.awayTeam.id,
      periodsResult: this.mapToArrayPipe.transform(element.awayScore.periods),
      currentResult: element.awayScore.current,
      winner: element.winner == 2
    }
  }
}
