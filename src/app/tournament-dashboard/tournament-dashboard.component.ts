import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ScheduleDto, ScheduleElementDto, TournamentDTO, TournamentStatus} from '../model/model';
import {TournamentService} from '../tournament.service';
import {AuthService} from '../service/auth.service';
import {LocaleMessages} from '../locale-messages';
import {MatDialog, MatTabChangeEvent} from '@angular/material';
import {TournamentScheduleDialogComponent} from '../prepare-tournament-round-fixtures-dialog/tournament-schedule-dialog.component';
import {FloatingButtonService} from '../floating-button.service';
import {GameData, TimetableData, TimetableElement} from '../tournament-timetable/tournament-timetable.component';
import {SnackBarService} from '../snack-bar.service';
import {MapToArrayPipe} from '../pipe/map-to-array.pipe';
import {Subject} from 'rxjs';
import {TournamentControlDialogComponent} from '../tournament-control-dialog/tournament-control-dialog.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-tournament-dashboard',
  templateUrl: './tournament-dashboard.component.html',
  styleUrls: ['./tournament-dashboard.component.scss']
})
export class TournamentDashboardComponent implements OnInit, OnDestroy {

  lm = LocaleMessages;

  tournament: TournamentDTO;

  tournamentLoadedSubject: Subject<boolean> = new Subject<boolean>();

  tournamentId: string;

  currentRound: number;

  futureGamesTimetableData: TimetableData = {elements: []};

  inProgressGamesTimetableData: TimetableData = {elements: []};

  endedGamesTimetableData: TimetableData = {elements: []};

  constructor(
    private router: ActivatedRoute,
    private tournamentService: TournamentService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackbarService: SnackBarService,
    private floatingButtonService: FloatingButtonService,
    private mapToArray: MapToArrayPipe,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.tournamentId = this.router.snapshot.paramMap.get('id');
    this.initTournament();
    this.tournamentLoadedSubject.subscribe(() => this.initGamesSchedule());
  }

  initTournament() {
    this.tournamentService.getTournament(this.tournamentId).subscribe(dto => {
      this.tournament = dto;
      this.tournamentLoadedSubject.next();
    });
  }

  private initFutureGamesSchedule() {
    this.tournamentService.getFutureGamesSchedule(this.tournamentId).subscribe(
      response => {
        this.createFutureSchedulesTimetableData(response);
      },
      () => this.snackbarService.openError(this.lm.unknownError)
    );
  }

  private initEndedGamesSchedule() {
    this.tournamentService.getEndedGamesSchedule(this.tournamentId).subscribe(
      response => this.createEndedGamesTimetableData(response),
      () => this.snackbarService.openError(this.lm.unknownError)
    );
  }

  private initInProgressGamesSchedule() {
    this.tournamentService.getInProgressGamesSchedule(this.tournamentId).subscribe(
      response => this.createInProgressGamesTimetableData(response),
      () => this.snackbarService.openError(this.lm.unknownError)
    );
  }

  startTournament() {
    this.tournamentService.updateTournamentStatus(
      {
        tournamentId: this.tournamentId,
        status: 'START'
      }
    ).subscribe(dto => this.tournament = dto);
  }

  reload() {
    this.initTournament();
    this.initGamesSchedule();
  }

  private initGamesSchedule() {
    if (this.tournament.status != TournamentStatus.BEFORE_START) {
      this.initFutureGamesSchedule();
      this.initInProgressGamesSchedule();
      this.initEndedGamesSchedule();
    }
  }

  isTournamentBeforeStart() {
    return this.tournament.status === TournamentStatus.BEFORE_START;
  }

  isTournamentInProgress() {
    return this.tournament.status === TournamentStatus.IN_PROGRESS;
  }

  isTournamentFinished() {
    return this.tournament.status === TournamentStatus.ENDED;
  }

  isResultEditTabVisible() {
    return this.isCurrentUserTournamentOwner() && this.isTournamentInProgress();
  }

  isTimetableTabVisible() {
    return this.isTournamentInProgress();
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reload();
      }
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.tab.textLabel === this.translate.instant(this.lm.schedule)) {
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

  createInProgressGamesTimetableData(schedule: ScheduleDto []) {
    this.inProgressGamesTimetableData = this.createTimetableData(schedule);
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
          left: scheduleElement.homeParticipant ? {
            participantId: scheduleElement.homeParticipant.id,
            name: scheduleElement.homeParticipant.name,
            currentResult: scheduleElement.homeScore ? scheduleElement.homeScore.current : null,
            periodsResult: scheduleElement.homeScore ? this.mapToArray.transform(scheduleElement.homeScore.periods) : null,
            winner: scheduleElement.winner === 1
          } : null,
          right: scheduleElement.awayParticipant ? {
            participantId: scheduleElement.awayParticipant.id,
            name: scheduleElement.awayParticipant.name,
            currentResult: scheduleElement.awayScore ? scheduleElement.awayScore.current : null,
            periodsResult: scheduleElement.awayScore ? this.mapToArray.transform(scheduleElement.awayScore.periods) : null,
            winner: scheduleElement.winner === 2
          } : null
        }
      });
    }
    return gamesData;
  }

  openTournamentControlDialog(): void {
    const dialogRef = this.dialog.open(TournamentControlDialogComponent, {
      width: '300px',
      autoFocus: true,
      data: {
        tournamentId: this.tournament.id,
        currentTournamentStatus: this.tournament.status
      }
    });

    dialogRef.afterClosed().subscribe(tournament => {
      if (tournament) {
        this.tournament = tournament;
      }
    });
  }

  ngOnDestroy(): void {
    this.setScheduleFloatingBtnAction(false);
  }
}
