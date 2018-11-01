import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../locale-messages';
import {COMPETITION_TYPE, TournamentCreatorConfig, TranslatableEnum} from '../model/model';
import {TournamentCreatorService} from '../service/tournament-creator.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {greaterEqThanValidator, lessEqThanValidator} from '../model/wt-validators';

// TODO daty są w nieprawidłowym formacie
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

  constructor(
    private service: TournamentCreatorService
  ) { }

  ngOnInit() {
    this.initConfig();
    this.initCommonFormGroup();
  }

  private initCommonFormGroup() {
    this.commonFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      accessOption: new FormControl('', Validators.required),
        fromDate: new FormControl(''),
        toDate: new FormControl(''),
      place: new FormControl('', Validators.required),
        description: new FormControl(''),
        minParticipants: new FormControl(''),
        maxParticipants: new FormControl(''),
      competition: new FormControl('', Validators.required)
      }
    );

    this.commonFormGroup.get('fromDate').setValidators([Validators.required, lessEqThanValidator('toDate')]);
    this.commonFormGroup.get('toDate').setValidators([Validators.required, greaterEqThanValidator('fromDate')]);

    this.commonFormGroup.get('minParticipants').setValidators([Validators.required, lessEqThanValidator('maxParticipants')]);
    this.commonFormGroup.get('maxParticipants').setValidators([Validators.required, greaterEqThanValidator('minParticipants')]);
  }

  private initConfig() {
    this.service.getConfig().subscribe(config => this.config = config);
  }

  public submitCommonForm() {
    if (this.commonFormGroup.valid) {
      this.initCompetitionDetailsFormGroup();
    }
  }

  public submitCompetitionDetailsFormGroup() {

  }

  private initCompetitionDetailsFormGroup() {
    if ((<TranslatableEnum> this.commonFormGroup.value['competition']).value === COMPETITION_TYPE.CHESS) {
      this.competitionDetailsFormGroup = new FormGroup({
        participantType: new FormControl('', Validators.required),
        tournamentSystem: new FormControl('', Validators.required)
      });
    }
  }
}
