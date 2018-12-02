import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  TOURNAMENT_STATUS,
  TournamentBundleUpdate,
  TournamentBundleUpdateContentType,
  TournamentDTO
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

  TOURNAMENT_STATUS = TOURNAMENT_STATUS;

  tournament: TournamentDTO;

  tournamentId: string;

  constructor(
    private router: ActivatedRoute,
    private tournamentService: TournamentService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.tournamentId = this.router.snapshot.paramMap.get('id');
    this.tournamentService.getTournament(this.tournamentId).subscribe(dto => this.tournament = dto);
  }

  startTournament() {
    this.tournamentService.updateTournament(this.prepareStartTournamentBundle()).subscribe(dto => this.tournament = dto);
  }

  endTournament() {
    this.tournamentService.updateTournament(this.prepareEndTournamentBundle()).subscribe(dto => this.tournament = dto);

  }

  openPrepareTournamentRoundFixturesDialog() {
    const dialogRef = this.dialog.open(PrepareTournamentRoundFixturesDialogComponent, {
      width: '50vw',
      data: this.tournament
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('close');
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
}
