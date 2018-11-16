import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../locale-messages';
import {COMPETITION_TYPE, TournamentCreatorConfig, TranslatableValue} from '../model/model';
import {TournamentCreatorService} from '../service/tournament-creator.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {greaterEqThanValidator, lessEqThanValidator} from '../model/wt-validators';
import {MapToArrayPipe} from '../pipe/map-to-array.pipe';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {RouterUrl} from '../config/routerUrl';

// TODO daty są w nieprawidłowym formacie

@Component({
  selector: 'app-tournament-creator',
  templateUrl: './tournament-creator.component.html',
  styleUrls: ['./tournament-creator.component.scss'],
})
export class TournamentCreatorComponent implements OnInit {

  routerUrl = RouterUrl;
  lm = LocaleMessages;
  config: TournamentCreatorConfig;
  commonFormGroup: FormGroup;
  competitionDetailsFormGroup: FormGroup;
  tournamentCreatorData = {};

  constructor(
    private service: TournamentCreatorService,
    private mapToArrayPipe: MapToArrayPipe,
    private snackBar: MatSnackBar,
    private router: Router,
    private translateService: TranslateService
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
      this.updateTournamentCreatorData();
      this.initCompetitionDetailsFormGroup();
    }
  }

  private updateTournamentCreatorData() {
    this.tournamentCreatorData = {};

    if (this.commonFormGroup) {
      this.mapToArrayPipe.transform(this.commonFormGroup.value).forEach(entry => {
        this.tournamentCreatorData[entry.first] = entry.second.translationKey ? entry.second.value : entry.second;
      });
    }

    if (this.competitionDetailsFormGroup) {
      this.mapToArrayPipe.transform(this.competitionDetailsFormGroup.value).forEach(entry => {
        this.tournamentCreatorData[entry.first] = entry.second.translationKey ? entry.second.value : entry.second;
      });
    }
  }

  public submitCompetitionDetailsFormGroup() {
    if (this.competitionDetailsFormGroup.valid) {
      this.updateTournamentCreatorData();
    }
  }

  public submitTournamentCreatorForm() {
    console.log(this.commonFormGroup.get('toDate'));
    this.service.send(this.tournamentCreatorData).subscribe(() => {
      // TODO zrobić url który przenosi do utworzonego turnieju (może idk w odpowiedzi)
      this.router.navigate([this.routerUrl.home]).catch();
      this.snackBar.open(this.translateService.instant(this.lm.tournamentCreatorSuccessMsg),
        this.translateService.instant(this.lm.close), {panelClass: 'success-snackbar'});
    }, () => {
      this.snackBar.open(this.translateService.instant(this.lm.serviceUnavailableErrorMsg),
        this.translateService.instant(this.lm.close), {panelClass: 'error-snackbar'});
    });
  }

  private initCompetitionDetailsFormGroup() {
    if ((<TranslatableValue<string>> this.commonFormGroup.value['competition']).value === COMPETITION_TYPE.CHESS) {
      this.competitionDetailsFormGroup = new FormGroup({
        participantType: new FormControl('', Validators.required),
        tournamentSystem: new FormControl('', Validators.required)
      });
    }
  }
}
