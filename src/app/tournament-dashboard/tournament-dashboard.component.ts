import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TournamentDTO, TournamentStatus} from '../model/model';
import {TournamentService} from '../tournament.service';
import {AuthService} from '../service/auth.service';
import {LocaleMessages} from '../locale-messages';
import {MatDialog} from '@angular/material';
import {TournamentScheduleDialogComponent} from '../prepare-tournament-round-fixtures-dialog/tournament-schedule-dialog.component';
import {FloatingButtonService} from '../floating-button.service';

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

  constructor(
    private router: ActivatedRoute,
    private tournamentService: TournamentService,
    private authService: AuthService,
    private dialog: MatDialog,
    private floatingButtonService: FloatingButtonService
  ) {
  }

  ngOnInit() {
    this.tournamentId = this.router.snapshot.paramMap.get('id');
    this.initTournament();
  }

  initTournament() {
    this.tournamentService.getTournament(this.tournamentId).subscribe(dto => this.tournament = dto);
    // this.tournamentService.getCurrentRound(this.tournamentId).subscribe(round => this.currentRound = round);
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
}
