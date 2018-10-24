import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../locale-messages';
import {COMPETITION_TYPE, TournamentCreatorConfig, TranslatableEnum} from '../model/model';
import {TournamentCreatorService} from '../service/tournament-creator.service';
import {FormControl, FormGroup} from '@angular/forms';

// TODO daty są w nieprawidłowym formacie
// TODO walidacja
// TODO przesyłanie na front

@Component({
  selector: 'app-tournament-creator',
  templateUrl: './tournament-creator.component.html',
  styleUrls: ['./tournament-creator.component.scss'],
})
export class TournamentCreatorComponent implements OnInit {

  lm = LocaleMessages;
  config: TournamentCreatorConfig;
  commonFormGroup: FormGroup;
  competitionDetailsFormGroup: FormGroup;

  enum: TranslatableEnum;

  constructor(
    private service: TournamentCreatorService
  ) { }

  ngOnInit() {
    this.service.getConfig().subscribe(config => this.config = config);
    // TODO dodać sprawdzenie czy min jest mniejsze od max dla daty i uczestników
    this.commonFormGroup = new FormGroup({
        name: new FormControl(''),
        accessOption: new FormControl(''),
        fromDate: new FormControl(''),
        toDate: new FormControl(''),
        place: new FormControl(''),
        description: new FormControl(''),
        minParticipants: new FormControl(''),
        maxParticipants: new FormControl(''),
        competition: new FormControl('')
      }
    );
  }

  public submitCommonForm() {
    console.log(this.commonFormGroup.value['competition']);
    if ((<TranslatableEnum> this.commonFormGroup.value['competition']).value === COMPETITION_TYPE.CHESS) {
      this.competitionDetailsFormGroup = new FormGroup({
        participantType: new FormControl(''),
        tournamentSystem: new FormControl('')
      });
    }
  }

  submitCompetitionDetailsForm() {
    console.log(this.commonFormGroup.value);
    console.log(this.commonFormGroup.value);

    console.log(Array.from(this.commonFormGroup.value));
    console.log(this.competitionDetailsFormGroup.value);
  }
}
