import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../locale-messages';
import {CompetitionType, TournamentCreatorConfig, TranslatableValue} from '../model/model';
import {TournamentCreatorService} from '../service/tournament-creator.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {greaterEqThanValidator, lessEqThanValidator} from '../model/wt-validators';
import {MapToArrayPipe} from '../pipe/map-to-array.pipe';
import {Router} from '@angular/router';
import {RouterUrl} from '../config/routerUrl';
import {SnackBarService} from '../snack-bar.service';

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
    private router: Router,
    private snackbarService: SnackBarService
  ) {
  }

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
      competition: new FormControl('', Validators.required),
      invitationLink: new FormControl('')
    });

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
        this.tournamentCreatorData[entry.left] = entry.right.translationKey ? entry.right.value : entry.right;
      });
    }

    if (this.competitionDetailsFormGroup) {
      this.mapToArrayPipe.transform(this.competitionDetailsFormGroup.value).forEach(entry => {
        this.tournamentCreatorData[entry.left] = entry.right.translationKey ? entry.right.value : entry.right;
      });
    }
  }

  public submitCompetitionDetailsFormGroup() {
    if (this.competitionDetailsFormGroup.valid) {
      this.updateTournamentCreatorData();
    }
  }

  public submitTournamentCreatorForm() {
    this.service.send(this.tournamentCreatorData).subscribe(
      response => {
        this.snackbarService.openSuccess(this.lm.tournamentCreatorSuccessMsg);
        this.redirectToTournament(response.tournamentId);
      }, () => this.snackbarService.openError(this.lm.serviceUnavailableErrorMsg));
  }

  private redirectToTournament(tournamentId: string) {
    this.router.navigate([RouterUrl.tournaments, tournamentId]).catch(
      () => this.snackbarService.openError(this.lm.redirectErrorMsg)
    );
  }

  private initCompetitionDetailsFormGroup() {
    if ((<TranslatableValue<CompetitionType>>this.commonFormGroup.value['competition']).value === CompetitionType.CHESS) {
      this.competitionDetailsFormGroup = new FormGroup({
        participantType: new FormControl('', Validators.required),
        tournamentSystem: new FormControl('', Validators.required)
      });
    }
  }
}
