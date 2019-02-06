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
      participantType: new FormControl('', Validators.required),
      systemType: new FormControl('', Validators.required)
    });

    this.commonFormGroup.get('startDate').setValidators([Validators.required, lessEqThanValidator('endDate')]);
    this.commonFormGroup.get('endDate').setValidators([Validators.required, greaterEqThanValidator('startDate')]);

    this.commonFormGroup.get('minParticipants').setValidators([Validators.required, Validators.min(2), lessEqThanValidator('maxParticipants')]);
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
    data.requiredAllGamesEndedStageTypes = this.getRequiredAllGamesEndedStageTypes();
    data.gamePeriodsNumber = this.getGamePeriodsNumber();

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

  getRequiredAllGamesEndedStageTypes(): StageType [] {
    const systemType = this.getSelectedSystemType();

    if (!ObjectUtils.exists(systemType)) {
      return [];
    }

    return this.config.creator.requiredAllGamesEndedStageTypesMapping[systemType];
  }

  getPlannedRound(n: number) {
    const systemType = this.getSelectedSystemType();

    if (!ObjectUtils.exists(n)) {
      return 0;
    }


    if (systemType === TournamentSystemType.LEAGUE) {
      return (2 * (n - 1));
    }

    if (systemType === TournamentSystemType.SWISS) {
      return Math.ceil(Math.log2(n));
    }

    if (systemType === TournamentSystemType.ROUND_ROBIN) {
      return (n - 1);
    }

    return 0;
  }

  getMinParticipants(): number {
    return this.commonFormGroup.get('minParticipants').value;
  }

  getMaxParticipants(): number {
    return this.commonFormGroup.get('maxParticipants').value;
  }

  private getGamePeriodsNumber(): number {
    const competitionType = this.getSelectedCompetitionType();

    if (!ObjectUtils.exists(competitionType)) {
      return 0;
    }
    return this.config.creator.competitionTypeToGamePeriodsNumberMapping[competitionType][0];
  }
}
