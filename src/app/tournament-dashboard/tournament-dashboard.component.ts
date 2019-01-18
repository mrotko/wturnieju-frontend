import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ScheduleDto, ScheduleElementDto, TournamentDTO, TournamentStatus} from '../model/model';
import {TournamentService} from '../tournament.service';
import {AuthService} from '../service/auth.service';
import {LocaleMessages} from '../locale-messages';
import {MatDialog} from '@angular/material';
import {TournamentScheduleDialogComponent} from '../prepare-tournament-round-fixtures-dialog/tournament-schedule-dialog.component';
import {FloatingButtonService} from '../floating-button.service';
import {GameData, TimetableData, TimetableElement} from '../tournament-timetable/tournament-timetable.component';
import {SnackBarService} from '../snack-bar.service';
import {MapToArrayPipe} from '../pipe/map-to-array.pipe';

@Component({
  selector: 'app-tournament-dashboard',
  templateUrl: './tournament-dashboard.component.html',
  styleUrls: ['./tournament-dashboard.component.scss']
})
export class TournamentDashboardComponent implements OnInit, OnDestroy {

  lm = LocaleMessages;

  tournament: TournamentDTO;

  tournamentId: string;

  currentRound: number;

  futureGamesTimetableData: TimetableData;

  endedGamesTimetableData: TimetableData;

  constructor(
    private router: ActivatedRoute,
    private tournamentService: TournamentService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackbarService: SnackBarService,
    private floatingButtonService: FloatingButtonService,
    private mapToArray: MapToArrayPipe
  ) {
  }

  ngOnInit() {
    this.tournamentId = this.router.snapshot.paramMap.get('id');
    this.initTournament();
    this.initFutureGamesSchedule();
    this.initEndedGamesSchedule();
  }

  initTournament() {
    this.tournamentService.getTournament(this.tournamentId).subscribe(dto => this.tournament = dto);
  }

  private initFutureGamesSchedule() {
    this.tournamentService.getFutureGamesSchedule(this.tournamentId).subscribe(
      response => {
        this.createFutureSchedulesTimetableData(response);
      },
      error => this.snackbarService.openError(this.lm.unknownError)
    );
  }

  private initEndedGamesSchedule() {
    this.tournamentService.getEndedGamesSchedule(this.tournamentId).subscribe(
      response => {
        this.createEndedGamesTimetableData(response);
      },
      error => this.snackbarService.openError(this.lm.unknownError)
    );
  }

  startTournament() {
    this.tournamentService.updateTournament(
      {
        tournamentId: this.tournamentId,
        status: 'START'
      }
    ).subscribe(dto => this.tournament = dto);
  }

  endTournament() {
    this.tournamentService.updateTournament({
      tournamentId: this.tournamentId,
      status: 'END'
    }).subscribe(dto => this.tournament = dto);
  }

  reload() {
    this.initTournament();
    this.initFutureGamesSchedule();
  }

  isTournamentBeforeStart() {
    return this.tournament.status === TournamentStatus.BEFORE_START;
  }

  isTournamentInProgress() {
    return this.tournament.status === TournamentStatus.IN_PROGRESS;
  }

  isCurrentUserTournamentOwner() {
    const currentUserId = this.authService.getUserFromStorage().id;
    const ownerId = this.tournament.owner.id;
    return ownerId === currentUserId;
  }

  setScheduleFloatingBtnAction(status: boolean) {
    if (status) {
      this.floatingButtonService.setButtonClickAction(() => this.openSchedulePopupForm());
    } else {
      this.floatingButtonService.setButtonClickAction(null);
    }
  }

  private openSchedulePopupForm() {
    const dialogRef = this.dialog.open(TournamentScheduleDialogComponent, {
      width: '50vw',
      data: this.tournament
    });

    dialogRef.afterClosed().subscribe(() => {
      this.reload();
    });
  }

  handleTabChange(index: number) {
    if (index === 2) {
      this.setScheduleFloatingBtnAction(true);
    } else {
      this.setScheduleFloatingBtnAction(false);
    }
  }

  createFutureSchedulesTimetableData(schedule: ScheduleDto []) {
    this.futureGamesTimetableData = this.createTimetableData(schedule);
  }

  createEndedGamesTimetableData(schedule: ScheduleDto []) {
    this.endedGamesTimetableData = this.createTimetableData(schedule);
    this.endedGamesTimetableData.elements.reverse();
  }

  createTimetableData(schedule: ScheduleDto []): TimetableData {
    let timetableElements: TimetableElement [] = [];

    for (let roundSchedule of (schedule || [])) {
      timetableElements.push({
        round: roundSchedule.round,
        games: this.createTimetableGamesData(roundSchedule.elements)
      });
    }

    return {
      elements: timetableElements
    }
  }

  private createTimetableGamesData(scheduleElements: ScheduleElementDto []): GameData [] {
    let gamesData: GameData [] = [];

    for (let scheduleElement of (scheduleElements || [])) {
      gamesData.push({
        date: scheduleElement.startDate,
        bye: scheduleElement.bye,
        teams: {
          left: {
            teamId: scheduleElement.homeTeam.id,
            name: scheduleElement.homeTeam.name,
            currentResult: scheduleElement.homeScore ? scheduleElement.homeScore.current : null,
            periodsResult: scheduleElement.homeScore ? this.mapToArray.transform(scheduleElement.homeScore.periods) : null,
            winner: scheduleElement.winner === 1
          },
          right: scheduleElement.awayTeam ? {
            teamId: scheduleElement.awayTeam.id,
            name: scheduleElement.awayTeam.name,
            currentResult: scheduleElement.awayScore ? scheduleElement.awayScore.current : null,
            periodsResult: scheduleElement.awayScore ? this.mapToArray.transform(scheduleElement.awayScore.periods) : null,
            winner: scheduleElement.winner === 2
          } : null
        }
      });
    }
    return gamesData;
  }

  ngOnDestroy(): void {
    this.setScheduleFloatingBtnAction(false);
  }
}
