import {Injectable} from '@angular/core';
import {CompetitionType} from '../model/model';
import {LocaleMessages} from '../locale-messages';

export interface GameEditorDialogData {
  gameId: string;
  tournamentId: string;
  competitionType: CompetitionType,
}

@Injectable()
export class AbstractGameDialog {

  lm = LocaleMessages;

}