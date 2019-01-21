import {Component} from '@angular/core';
import {VerificationComponent} from '../verification/verification.component';
import {VerificationService} from '../verification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TournamentService} from '../tournament.service';
import {TournamentDTO} from '../model/model';
import {SnackBarService} from '../snack-bar.service';
import {RouterUrl} from '../config/routerUrl';

@Component({
  selector: 'app-tournament-invite-verification',
  templateUrl: './tournament-invite-verification.component.html',
  styleUrls: ['./tournament-invite-verification.component.scss']
})
export class TournamentInviteVerificationComponent extends VerificationComponent {

  tournament: TournamentDTO;

  constructor(
    private tournamentService: TournamentService,
    private snackbarService: SnackBarService,
    verificationService: VerificationService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(verificationService, route, router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initTournament();
  }

  private initTournament() {
    const tournamentId = this.route.snapshot.queryParamMap.get("tournamentId");
    this.tournamentService.getTournament(tournamentId).subscribe(tournament => this.tournament = tournament);
  }

  onJoinClick() {
    this.verificationService.reactToTournamentInvitation(this.token, true).subscribe(
      () => {
        this.snackbarService.openSuccess(this.lm.acceptTournamentInvitationMsg);
        this.redirectToToTournamentPage();
      },
      () => {
        this.snackbarService.openError(this.lm.unknownError);
        this.redirectToHomePage();
      }
    );
  }

  onDiscardClick() {
    this.verificationService.reactToTournamentInvitation(this.token, false).subscribe(
      () => {
        this.snackbarService.openSuccess(this.lm.discardTournamentInvitationMsg);
      },
      () => this.snackbarService.openError(this.lm.unknownError),
      () => this.redirectToHomePage()
    );
  }

  redirectToToTournamentPage() {
    this.router.navigate([RouterUrl.tournaments, this.tournament.id])
      .catch();
  }
}
