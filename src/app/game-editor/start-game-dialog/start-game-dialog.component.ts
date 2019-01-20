import {Component, Inject, OnInit} from '@angular/core';
import {CompetitionType, GameEventType, GameFixtureDto, StartGameEventDto} from '../../model/model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GameEditorService} from '../game-editor.service';
import {SnackBarService} from '../../snack-bar.service';
import {AbstractGameDialog, GameEditorDialogData} from '../AbstractGameDialog';

export interface StartGameEditorDialogData extends GameEditorDialogData {
  gameId: string;
  tournamentId: string;
  competitionType: CompetitionType,
}

@Component({
  selector: 'app-game-editor-dialog',
  templateUrl: './start-game-dialog.component.html',
  styleUrls: ['./start-game-dialog.component.scss']
})
export class StartGameDialogComponent extends AbstractGameDialog implements OnInit {

  eventData: StartGameEventDto;

  constructor(
    private dialogRef: MatDialogRef<StartGameDialogComponent>,
    private gameEditorService: GameEditorService,
    private snackbarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) private popupData: StartGameEditorDialogData
  ) {
    super();
  }

  ngOnInit() {
    this.eventData = {
      gameId: this.popupData.gameId,
      gameEventType: GameEventType.GAME_START,
      tournamentId: this.popupData.tournamentId,
      competitionType: this.popupData.competitionType,
      startDate: new Date()
    }
  }

  confirmBtnClick() {
    this.gameEditorService.startGame(<StartGameEventDto>this.eventData).subscribe(
      response => this.close(response),
      error => this.snackbarService.openError(this.lm.unknownError),
    );
  }

  cancelBtnClick() {
    this.close(null);
  }

  close(gameFixtureDto: GameFixtureDto | null): void {
    this.dialogRef.close(gameFixtureDto);
  }

  isChessTournament(): boolean {
    return this.popupData.competitionType === CompetitionType.CHESS;
  }
}
