import {Injectable} from '@angular/core';
import {CompetitionType, PeriodsConfigDto} from '../model/model';
import {LocaleMessages} from '../locale-messages';

export interface GameEditorDialogData {
  gameId: string;
  tournamentId: string;
  competitionType: CompetitionType,
  periodsConfig: PeriodsConfigDto;
}

@Injectable()
export class AbstractGameDialog {

  lm = LocaleMessages;

}