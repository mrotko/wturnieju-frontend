import {Component, Inject, OnInit} from '@angular/core';
import {AbstractGameDialog, GameEditorDialogData} from '../AbstractGameDialog';
import {CompetitionType, FinishGameEventDto, GameEventType, GameFixtureDto} from '../../model/model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GameEditorService} from '../game-editor.service';
import {SnackBarService} from '../../snack-bar.service';

export interface FinishGameEditorDialogData extends GameEditorDialogData {
  homeName: string;
  awayName: string;
}

@Component({
  selector: 'app-finish-game-dialog',
  templateUrl: './finish-game-dialog.component.html',
  styleUrls: ['./finish-game-dialog.component.scss']
})
export class FinishGameDialogComponent extends AbstractGameDialog implements OnInit {

  eventData: FinishGameEventDto;

  constructor(
    private dialogRef: MatDialogRef<FinishGameDialogComponent>,
    private gameEditorService: GameEditorService,
    private snackbarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) private popupData: FinishGameEditorDialogData
  ) {
    super();
  }

  ngOnInit() {
    this.eventData = {
      gameEventType: GameEventType.GAME_FINISHED,
      tournamentId: this.popupData.tournamentId,
      gameId: this.popupData.gameId,
      competitionType: this.popupData.competitionType,
      finishedDate: new Date(),
      winner: 0
    }
  }

  getPopupData(): FinishGameEditorDialogData {
    return this.popupData;
  }

  onConfirmBtnClick() {
    this.gameEditorService.finishGame(this.eventData).subscribe(
      response => this.close(response),
      error => this.snackbarService.openError(this.lm.unknownError)
    );
  }

  onCancelBtnClick() {
    this.close(null);
  }

  close(gameFixtureDto: GameFixtureDto | null): void {
    this.dialogRef.close(gameFixtureDto);
  }

  isChessTournament(): boolean {
    return this.popupData.competitionType === CompetitionType.CHESS;
  }
}
