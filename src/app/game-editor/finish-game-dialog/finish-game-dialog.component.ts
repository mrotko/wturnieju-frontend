import {Component, Inject, OnInit} from '@angular/core';
import {AbstractGameDialog, GameEditorDialogData} from '../AbstractGameDialog';
import {
  CompetitionType,
  FinishGameEventDto,
  FootballPeriodType,
  GameEventType,
  GameFixtureDto,
  TennisPeriodType
} from '../../model/model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {GameEditorService} from '../game-editor.service';
import {SnackBarService} from '../../snack-bar.service';
import {CollectionUtils} from '../../utils/CollectionUtils';
import {ObjectUtils} from '../../utils/ObjectUtils';
import {MapToArrayPipe} from '../../pipe/map-to-array.pipe';

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

  periodTypes: FootballPeriodType [] | TennisPeriodType [];

  selectedPeriods: { [key: number]: boolean } = {};

  constructor(
    private dialogRef: MatDialogRef<FinishGameDialogComponent>,
    private gameEditorService: GameEditorService,
    private snackbarService: SnackBarService,
    private mapToArrayPipe: MapToArrayPipe,
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
      homeScore: {
        current: 0,
        periods: {}
      },
      awayScore: {
        current: 0,
        periods: {}
      },
      finishedDate: new Date(),
      winner: 0
    };
    this.initPeriodTypes();
    this.initPeriodValues();
  }

  getPopupData(): FinishGameEditorDialogData {
    return this.popupData;
  }

  onConfirmBtnClick() {
    this.removeNotSelectedPeriods();
    if (!this.isScoreValid()) {
      return;
    }

    this.gameEditorService.finishGame(this.eventData).subscribe(
      response => this.close(response),
      () => this.snackbarService.openError(this.lm.unknownError)
    );
  }

  onCancelBtnClick() {
    this.close(null);
  }

  close(gameFixtureDto: GameFixtureDto | null): void {
    this.dialogRef.close(gameFixtureDto);
  }

  getRange(n: number): number [] {
    return CollectionUtils.range(n);
  }

  private initPeriodTypes() {
    if (this.getPopupData().competitionType === CompetitionType.FOOTBALL) {
      this.periodTypes = [
        FootballPeriodType.FIRST_HALF,
        FootballPeriodType.SECOND_HALF
      ]
    } else if (this.getPopupData().competitionType === CompetitionType.TENNIS) {
      this.periodTypes = [
        TennisPeriodType.FIRST_SET,
        TennisPeriodType.SECOND_SET,
        TennisPeriodType.THIRD_SET,
      ]
    }
  }

  private initPeriodValues() {
    this.getRange(this.popupData.periodsConfig.periodsNumber).forEach(i => {
      this.eventData.homeScore.periods[i] = 0;
      this.eventData.awayScore.periods[i] = 0;
      this.selectedPeriods[i] = !this.isPeriodOptional(i);
    });
  }

  private isScoreValid() {
    let values: number [] = [];

    values.push(this.eventData.awayScore.current);
    values.push(this.eventData.homeScore.current);
    this.mapToArrayPipe.transform(this.eventData.homeScore.periods).forEach((k, v) => values.push(v));
    this.mapToArrayPipe.transform(this.eventData.awayScore.periods).forEach((k, v) => values.push(v));

    for (let v of values) {
      if (!ObjectUtils.exists(v)) {
        return false;
      }
    }

    return true;
  }

  isPeriodOptional(periodNumber: number): boolean {
    return periodNumber >= this.popupData.periodsConfig.requiredPeriodsNumber
  }

  getPeriodsRange() {
    return this.getRange(this.popupData.periodsConfig.periodsNumber);
  }

  private removeNotSelectedPeriods() {
    const periodsToCheckMapping = this.mapToArrayPipe.transform(this.selectedPeriods);
    const selectedHomePeriodsWithValues = {};
    const selectedAwayPeriodsWithValues = {};
    for (let i = 0; i < periodsToCheckMapping.length; i++) {
      if (periodsToCheckMapping[i].right) {
        selectedHomePeriodsWithValues[i] = this.eventData.homeScore.periods[i];
        selectedAwayPeriodsWithValues[i] = this.eventData.awayScore.periods[i];
      } else {
        break;
      }
    }

    this.eventData.homeScore.periods = selectedHomePeriodsWithValues;
    this.eventData.awayScore.periods = selectedAwayPeriodsWithValues;
  }
}
