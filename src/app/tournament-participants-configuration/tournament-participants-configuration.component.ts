import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TournamentParticipantsService} from '../tournament-participants.service';
import {SnackBarService} from '../snack-bar.service';
import {InvitationStatus, TournamentDTO, TournamentParticipantDTO} from '../model/model';
import {LocaleMessages} from '../locale-messages';
import {FloatingButtonService} from '../floating-button.service';
import {InviteTournamentParticipantPopupService} from '../invite-tournament-participant-popup.service';
import {MatDialog} from '@angular/material';
import {InviteTournamentParticipantPopupComponent} from '../invite-tournament-participant-popup/invite-tournament-participant-popup.component';
import {SearchService} from '../search.service';
import {ClipboardService} from 'ngx-clipboard';

@Component({
  selector: 'app-tournament-participants-configuration',
  templateUrl: './tournament-participants-configuration.component.html',
  styleUrls: ['./tournament-participants-configuration.component.scss']
})
export class TournamentParticipantsConfigurationComponent implements OnInit, OnDestroy {

  @Input() tournament: TournamentDTO;

  lm = LocaleMessages;

  private tournamentParticipants: TournamentParticipantDTO [];

  acceptedParticipants: TournamentParticipantDTO [];
  invitedParticipants: TournamentParticipantDTO [];
  requestedParticipants: TournamentParticipantDTO [];

  constructor(
    private searchService: SearchService,
    private tournamentParticipantsService: TournamentParticipantsService,
    private tournamentService: TournamentParticipantsService,
    private snackbarService: SnackBarService,
    private floatButtonService: FloatingButtonService,
    private dialog: MatDialog,
    private clipboardService: ClipboardService
  ) { }

  ngOnInit() {
    this.floatButtonService.setButtonClickAction(() => this.openPopup());
    this.initTournamentParticipants();
  }

  private openPopup() {
    const dialogRef = this.dialog.open(InviteTournamentParticipantPopupComponent, {
      width: '50vw',
      data: this.createPopupService()
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

  private splitParticipantsByInvitationStatus(participants: TournamentParticipantDTO []) {
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

  private createPopupService(): InviteTournamentParticipantPopupService {
    const currentParticipantsIds = this.getCurrentParticipantsIds();
    const ownerId = this.tournament.owner.id;
    return new InviteTournamentParticipantPopupService(this.searchService, currentParticipantsIds, ownerId);
  }

  ngOnDestroy(): void {
    this.floatButtonService.setButtonClickAction(null);
  }

  private getTournamentId(): string {
    if (this.tournament) {
      return this.tournament.id;
    }
    return null;
  }

  private getOwnerId() {
    if(this.tournament) {
      return this.tournament.owner.id;
    }
    return null;
  }

  private getCurrentParticipantsIds() {
    if (this.tournamentParticipants) {
      return this.tournamentParticipants.map(p => p.id);
    }
    return [];
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
    return location.host + "/verification/tournament-participation-request?token={1}&tournamentId={2}"
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
}
