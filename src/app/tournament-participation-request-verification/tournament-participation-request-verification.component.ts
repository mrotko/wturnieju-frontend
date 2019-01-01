import {Component} from '@angular/core';
import {VerificationComponent} from '../verification/verification.component';
import {VerificationService} from '../verification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {TournamentDTO, User} from '../model/model';
import {SnackBarService} from '../snack-bar.service';
import {RouterUrl} from '../config/routerUrl';
import {TournamentService} from '../tournament.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-tournament-participation-request-verification',
  templateUrl: './tournament-participation-request-verification.component.html',
  styleUrls: ['./tournament-participation-request-verification.component.scss']
})
export class TournamentParticipationRequestVerificationComponent extends VerificationComponent{

  private currentUser: User;

  private tournament: TournamentDTO;

  constructor(
    private authService: AuthService,
    private snackbarService: SnackBarService,
    private tournamentService: TournamentService,
    verificationService: VerificationService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(verificationService, route, router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.currentUser = this.authService.getUserFromStorage();
    this.initTournament();
  }

  private initTournament() {
    const tournamentId = this.route.snapshot.queryParamMap.get('tournamentId');
    this.tournamentService.getTournament(tournamentId).subscribe(
      tournament => this.tournament = tournament,
      () => this.snackbarService.openError(this.lm.unknownError)
    );
  }

  onJoinBtnClick() {
    this.verificationService.addUserToTournamentParticipants(this.token, this.currentUser.id).subscribe(
      () => this.redirectToTournament(),
      (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.snackbarService.openError(this.lm.userParticipateErrorMsg);
        } else {
          this.snackbarService.openError(this.lm.unknownError);
        }
      }
    );
  }

  private redirectToTournament() {
    this.router.navigate([RouterUrl.tournaments, this.tournament.id]).catch();
  }
}
