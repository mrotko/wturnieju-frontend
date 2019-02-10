import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TournamentParticipantsService} from '../tournament-participants.service';
import {SnackBarService} from '../snack-bar.service';
import {InvitationStatus, ParticipantDTO, TournamentDTO} from '../model/model';
import {LocaleMessages} from '../locale-messages';
import {FloatingButtonService} from '../floating-button.service';
import {MatDialog} from '@angular/material';
import {InviteTournamentParticipantPopupComponent} from '../invite-tournament-participant-popup/invite-tournament-participant-popup.component';
import {SearchService} from '../search.service';
import {ClipboardService} from 'ngx-clipboard';
import {TournamentService} from '../tournament.service';
import {environment} from '../../environments/environment';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {RouterUrl} from '../config/routerUrl';

@Component({
  selector: 'app-tournament-participants-configuration',
  templateUrl: './tournament-participants-configuration.component.html',
  styleUrls: ['./tournament-participants-configuration.component.scss']
})
export class TournamentParticipantsConfigurationComponent implements OnInit, OnDestroy {

  @Input() tournament: TournamentDTO;

  @Output() startTournamentBtnClickEvent: EventEmitter<any> = new EventEmitter();

  @Input() isTournamentOwner: boolean = false;

  lm = LocaleMessages;

  private tournamentParticipants: ParticipantDTO [];

  acceptedParticipants: ParticipantDTO [];
  invitedParticipants: ParticipantDTO [];
  requestedParticipants: ParticipantDTO [];

  constructor(
    private searchService: SearchService,
    private tournamentParticipantsService: TournamentParticipantsService,
    private tournamentService: TournamentService,
    private snackbarService: SnackBarService,
    private floatButtonService: FloatingButtonService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private clipboardService: ClipboardService
  ) {
  }

  ngOnInit() {
    this.initFloatBtnService();
    this.initTournamentParticipants();
  }

  private openPopup() {
    const dialogRef = this.dialog.open(InviteTournamentParticipantPopupComponent, {
      width: '50vw',
      data: {
        invitedUserIds: this.getInvitedUsersIds()
      }
    });
    dialogRef.afterClosed().subscribe((invitedIds: string []) => {
      if (invitedIds && invitedIds.length > 0) {
        this.tournamentParticipantsService.invite(this.tournament.id, invitedIds).subscribe(() => {
            this.snackbarService.openSuccess(this.lm.success);
          }, () => this.snackbarService.openError(this.lm.unknownError),
          () => this.initTournamentParticipants()
        );
      }
    });
  }

  private splitParticipantsByInvitationStatus(participants: ParticipantDTO []) {
    this.clearParticipantLists();
    for (const participant of participants) {
      switch (participant.invitationStatus) {
        case InvitationStatus.ACCEPTED:
          this.acceptedParticipants.push(participant);
          break;
        case InvitationStatus.REJECTED:
        case InvitationStatus.INVITED:
          this.invitedParticipants.push(participant);
          break;
        case InvitationStatus.PARTICIPATION_REQUEST:
          this.requestedParticipants.push(participant);
          break;
      }
    }
  }

  private clearParticipantLists() {
    this.acceptedParticipants = [];
    this.invitedParticipants = [];
    this.requestedParticipants = [];
  }

  ngOnDestroy(): void {
    this.floatButtonService.setButtonClickAction(null);
  }

  private getInvitedUsersIds(): string [] {
    let usersIds: string [] = [];
    if (this.tournamentParticipants) {
      this.tournamentParticipants
        .forEach(participant => {
          usersIds = usersIds.concat(participant.members.map(p => p.userId));
        });
    }
    return usersIds;
  }

  private initTournamentParticipants() {
    this.tournamentParticipantsService.getParticipants(this.tournament.id).subscribe(participants => {
      this.tournamentParticipants = participants;
      this.splitParticipantsByInvitationStatus(participants);
    });
  }

  removeParticipant(participantId: string) {
    this.tournamentParticipantsService.remove(this.tournament.id, participantId)
      .subscribe(() => this.snackbarService.openSuccess(this.lm.removed),
        () => this.snackbarService.openError(this.lm.unknownError),
        () => this.initTournamentParticipants()
      );
  }

  acceptParticipant(participantId: string) {
    this.tournamentParticipantsService.accept(this.tournament.id, participantId)
      .subscribe(() => this.snackbarService.openSuccess(this.lm.accepted),
        () => this.snackbarService.openError(this.lm.unknownError),
        () => this.initTournamentParticipants()
      );
  }

  createInvitationLink(): string | null {
    if (!this.tournament.invitationToken) {
      return null;
    }
    return environment.hostname + "/verification/tournament-participation-request?token={1}&tournamentId={2}"
      .replace('{1}', this.tournament.invitationToken)
      .replace('{2}', this.tournament.id);
  }

  copyToClipboard(data: string) {
    const result = this.clipboardService.copyFromContent(data);
    if (result) {
      this.snackbarService.openSuccess(this.lm.clipboardCopySuccessMsg);
    } else {
      this.snackbarService.openError(this.lm.clipboardCopyErrorMsg);
    }
  }

  countAcceptedParticipants(): number {
    if (this.acceptedParticipants) {
      return this.acceptedParticipants.length;
    }
    return 0;
  }

  isValidNumberOfParticipants() {
    const participants = this.countAcceptedParticipants();
    return this.tournament.minParticipants <= participants &&
      participants <= this.tournament.maxParticipants;
  }

  startTournament() {
    this.startTournamentBtnClickEvent.emit();
  }

  private initFloatBtnService() {
    if (this.isTournamentOwner) {
      this.floatButtonService.setButtonClickAction(() => this.openPopup());
    }
  }

  onJoinToTournament() {
    const user = this.authService.getUserFromStorage();
    if (user == null) {
      this.router.navigate([RouterUrl.login], {
        queryParams: {
          'returnUrl': this.router.url
        }
      }).catch();
    } else {
      this.tournamentParticipantsService.requestParticipation(this.tournament.id, user.id).subscribe(
        () => this.initTournamentParticipants(),
        () => this.snackbarService.openError(this.lm.unknownError)
      );
    }
  }
}
