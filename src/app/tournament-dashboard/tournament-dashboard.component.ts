import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-tournament-dashboard',
  templateUrl: './tournament-dashboard.component.html',
  styleUrls: ['./tournament-dashboard.component.scss']
})
export class TournamentDashboardComponent implements OnInit {

  lm = LocaleMessages;

  tournament: TournamentDTO;

  tournamentId: string;

  currentRound: number;

  futureGamesTimetableData: TimetableData;

  constructor(
    private router: ActivatedRoute,
    private tournamentService: TournamentService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackbarService: SnackBarService,
    private floatingButtonService: FloatingButtonService
  ) {
  }

  ngOnInit() {
    this.tournamentId = this.router.snapshot.paramMap.get('id');
    this.initTournament();
    this.initSchedule();
  }

  initTournament() {
    this.tournamentService.getTournament(this.tournamentId).subscribe(dto => this.tournament = dto);
    // this.tournamentService.getCurrentRound(this.tournamentId).subscribe(round => this.currentRound = round);
  }

  private initSchedule() {
    this.tournamentService.getSchedule(this.tournamentId).subscribe(
      response => {
        this.createFutureGamesTimetableData(response);
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

  createFutureGamesTimetableData(schedule: ScheduleDto []) {
    let timetableElements: TimetableElement [] = [];

    for (let roundSchedule of (schedule || [])) {
      timetableElements.push({
        round: roundSchedule.round,
        games: this.createTimetableGamesData(roundSchedule.elements)
      });
    }

    this.futureGamesTimetableData = {
      elements: timetableElements
    };
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
            currentResult: null,
            periodsResult: [],
            winner: null
          },
          right: scheduleElement.awayTeam ? {
            teamId: scheduleElement.awayTeam.id,
            name: scheduleElement.awayTeam.name,
            currentResult: null,
            periodsResult: [],
            winner: null
          } : null
        }
      });
    }
    return gamesData;
  }
}
