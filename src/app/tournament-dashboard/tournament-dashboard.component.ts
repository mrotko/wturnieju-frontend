import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  TournamentBundleUpdate,
  TournamentBundleUpdateContentType,
  TournamentDTO,
  TournamentStatus
} from '../model/model';
import {TournamentService} from '../tournament.service';
import {AuthService} from '../service/auth.service';
import {LocaleMessages} from '../locale-messages';
import {MatDialog} from '@angular/material';
import {PrepareTournamentRoundFixturesDialogComponent} from '../prepare-tournament-round-fixtures-dialog/prepare-tournament-round-fixtures-dialog.component';

@Component({
  selector: 'app-tournament-dashboard',
  templateUrl: './tournament-dashboard.component.html',
  styleUrls: ['./tournament-dashboard.component.scss']
})
export class TournamentDashboardComponent implements OnInit {

  /* TODO zarządzanie czasem turnieju
  * start, koniec turnieju
  * */

  lm = LocaleMessages;

  tournament: TournamentDTO;

  tournamentId: string;

  currentRound: number;

  constructor(
    private router: ActivatedRoute,
    private tournamentService: TournamentService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.tournamentId = this.router.snapshot.paramMap.get('id');
    this.initTournament();
  }

  initTournament() {
    this.tournamentService.getTournament(this.tournamentId).subscribe(dto => this.tournament = dto);
    this.tournamentService.getCurrentRound(this.tournamentId).subscribe(round => this.currentRound = round);
  }

  startTournament() {
    this.tournamentService.updateTournament(this.prepareStartTournamentBundle()).subscribe(dto => this.tournament = dto);
  }

  endTournament() {
    this.tournamentService.updateTournament(this.prepareEndTournamentBundle()).subscribe(dto => this.tournament = dto);

  }

  isNextRoundAvailable(): boolean {
    return this.currentRound ? this.currentRound < this.tournament.plannedRounds : true;
  }

  openPrepareTournamentRoundFixturesDialog() {
    const dialogRef = this.dialog.open(PrepareTournamentRoundFixturesDialogComponent, {
      width: '50vw',
      data: this.tournament
    });

    dialogRef.afterClosed().subscribe(() => {
      this.reload();
    });
  }

  prepareStartTournamentBundle(): TournamentBundleUpdate {
    return {
      timestamp: new Date(),
      tournamentId: this.tournament.id,
      changedBy: this.authService.getUserFromStorage(),
      tournamentSystemType: this.tournament.systemType,
      content: {
        startDate: this.tournament.startDate,
        type: TournamentBundleUpdateContentType.START
      }
    };
  }

  prepareEndTournamentBundle(): TournamentBundleUpdate {
    return {
      timestamp: new Date(),
      tournamentId: this.tournament.id,
      changedBy: this.authService.getUserFromStorage(),
      tournamentSystemType: this.tournament.systemType,
      content: {
        endDate: this.tournament.endDate,
        type: TournamentBundleUpdateContentType.END
      }
    };
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
}
