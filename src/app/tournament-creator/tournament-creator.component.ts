import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../locale-messages';
import {
  AccessOption,
  CompetitionType,
  ParticipantType,
  StageType,
  TournamentCreatorConfigDto,
  TournamentSystemType,
  TournamentTableColumnType,
  TournamentTemplateDto
} from '../model/model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {greaterEqThanValidator, lessEqThanValidator} from '../model/wt-validators';
import {RouterUrl} from '../config/routerUrl';
import {TournamentCreatorService} from './tournament-creator.service';
import {MapToArrayPipe} from '../pipe/map-to-array.pipe';
import {SnackBarService} from '../snack-bar.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {ObjectUtils} from '../utils/ObjectUtils';

// TODO daty są w nieprawidłowym formacie

@Component({
  selector: 'app-tournament-creator',
  templateUrl: './tournament-creator.component.html',
  styleUrls: ['./tournament-creator.component.scss'],
})
export class TournamentCreatorComponent implements OnInit {

  routerUrl = RouterUrl;

  lm = LocaleMessages;

  config: TournamentCreatorConfigDto;

  commonFormGroup: FormGroup;

  private configInitializedSubject: Subject<boolean> = new Subject();

  constructor(
    private service: TournamentCreatorService,
    private mapToArrayPipe: MapToArrayPipe,
    private router: Router,
    private snackbarService: SnackBarService
  ) {
  }

  ngOnInit() {
    this.initConfig();
    this.configInitializedSubject.subscribe(status => {
      if (status === true) {
        this.initCommonFormGroup();
      }
    })
  }

  private initCommonFormGroup() {
    this.commonFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      accessOption: new FormControl('', Validators.required),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      place: new FormControl('', Validators.required),
      description: new FormControl(''),
      minParticipants: new FormControl(''),
      maxParticipants: new FormControl(''),
      competitionType: new FormControl('', Validators.required),
      invitationLink: new FormControl(''),
      participantType: new FormControl({disabled: true}, Validators.required),
      systemType: new FormControl({disabled: true}, Validators.required)
    });

    this.commonFormGroup.get('startDate').setValidators([Validators.required, lessEqThanValidator('endDate')]);
    this.commonFormGroup.get('endDate').setValidators([Validators.required, greaterEqThanValidator('startDate')]);

    this.commonFormGroup.get('minParticipants').setValidators([Validators.required, lessEqThanValidator('maxParticipants')]);
    this.commonFormGroup.get('maxParticipants').setValidators([Validators.required, greaterEqThanValidator('minParticipants')]);
  }

  private initConfig() {
    this.service.getConfig().subscribe(config => {
        this.config = config;
        this.configInitializedSubject.next(true);
      },
      () => {
        this.snackbarService.openError(this.lm.unknownError);
        this.configInitializedSubject.next(false);
      }
    );
  }

  public submitTournamentCreatorForm() {
    const data: TournamentTemplateDto = this.commonFormGroup.value;

    data.scoring = this.getScoring();
    data.tableColumns = this.getTableColumns();
    data.stageTypes = this.getStageTypes();

    this.service.send(data).subscribe(
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

  getAvailableCompetitionTypes(): CompetitionType [] {
    return this.config.creator['competitionTypes'];
  }

  private getSelectedCompetitionType(): CompetitionType {
    return this.commonFormGroup.value['competitionType'];
  }

  private getSelectedSystemType(): TournamentSystemType {
    return this.commonFormGroup.value['systemType'];
  }

  getAvailableSystemTypes(): TournamentSystemType [] {
    const competitionType = this.getSelectedCompetitionType();

    if (!ObjectUtils.exists(competitionType)) {
      return [];
    }

    return this.config.creator.systemTypes[competitionType];
  }

  getAvailableParticipantTypes(): ParticipantType [] {
    const competitionType = this.getSelectedCompetitionType();

    if (!ObjectUtils.exists(competitionType)) {
      return [];
    }

    return this.config.creator.participantTypes[competitionType];
  }

  getAvailableAccessOptions(): AccessOption [] {
    return this.config.creator.accessOptions;
  }

  getScoring(): { [key: string]: number } {
    let scoring: { [key: string]: number } = {};
    const competitionsIndex = this.config.scoring.findIndex(c => c.competitionType === this.getSelectedCompetitionType());

    if (competitionsIndex >= 0) {
      const competitionConfig = this.config.scoring[competitionsIndex];
      const systemIndex = competitionConfig.tournamentSystems.findIndex(s => s.tournamentSystemType === this.getSelectedSystemType());

      if (systemIndex >= 0) {
        const gameResults = competitionConfig.tournamentSystems[systemIndex].gameResults;

        for (const gameResult of gameResults) {
          scoring[gameResult.gameResultType] = gameResult.points;
        }
      }
    }
    return scoring;
  }

  getTableColumns(): TournamentTableColumnType [] {
    const systemType = this.getSelectedSystemType();
    if (!ObjectUtils.exists(systemType)) {
      return [];
    }

    return this.config.creator.columnTypes[systemType];
  }

  getStageTypes(): StageType [] {
    const systemType = this.getSelectedSystemType();

    if (!ObjectUtils.exists(systemType)) {
      return [];
    }

    return this.config.creator.stageTypes[systemType];
  }
}
