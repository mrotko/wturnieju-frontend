import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {TournamentService} from '../tournament.service';
import {SnackBarService} from '../snack-bar.service';
import {LocaleMessages} from '../locale-messages';
import {TournamentDTO, TournamentStatus} from '../model/model';


interface TournamentControlDialogPopupData {
  tournamentId: string;
  currentTournamentStatus: TournamentStatus
}

@Component({
  selector: 'app-tournament-control-dialog',
  templateUrl: './tournament-control-dialog.component.html',
  styleUrls: ['./tournament-control-dialog.component.scss']
})
export class TournamentControlDialogComponent implements OnInit {

  lm = LocaleMessages;

  constructor(
    private dialogRef: MatDialogRef<TournamentControlDialogComponent>,
    private tournamentService: TournamentService,
    private snackbarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) private popupData: TournamentControlDialogPopupData
  ) {
  }

  ngOnInit() {

  }

  onFinishTournament() {
    this.tournamentService.updateTournamentStatus(
      {
        status: 'FINISH',
        tournamentId: this.popupData.tournamentId
      }
    ).subscribe(
      tournamentDto => this.closeDialog(tournamentDto),
      () => this.snackbarService.openError(this.lm.unknownError)
    )
  }

  private closeDialog(tournamentDto?: TournamentDTO) {
    this.dialogRef.close(tournamentDto);
  }

  onClose() {
    this.closeDialog();
  }

  isTournamentInProgress() {
    return this.popupData.currentTournamentStatus === TournamentStatus.IN_PROGRESS;
  }
}
