import {Component, OnDestroy, OnInit} from '@angular/core';
import {TournamentService} from '../tournament.service';
import {TournamentDTO, TournamentStatus, TranslatableValue, Tuple2} from '../model/model';
import {AuthService} from '../service/auth.service';
import {LocaleMessages} from '../locale-messages';
import {Router} from '@angular/router';
import {RouterUrl} from '../config/routerUrl';
import {MapToArrayPipe} from '../pipe/map-to-array.pipe';
import {FloatingButtonService} from '../floating-button.service';

export interface TournamentParticipant {
  id: string;
  name: string;
  surname: string;
}

interface BeforeStartTableRow {
  position: number;
  tournamentName: string;
  competitionType: TranslatableValue<string>;
  tournamentSystemType: TranslatableValue<string>;
  startDate: Date;
  endDate: Date;
  tournamentId: string;
}

interface InProgressTableRow {
  position: number;
  tournamentName: string;
  competitionType: TranslatableValue<string>;
  tournamentSystemType: TranslatableValue<string>;
  startDate: Date;
  endDate: Date;
  currentRound: number;
  nextOpponent: TournamentParticipant;
  tournamentId: string;
}

interface EndedTableRow {
  position: number;
  tournamentName: string;
  competitionType: TranslatableValue<string>;
  tournamentSystemType: TranslatableValue<string>;
  startDate: Date;
  endDate: Date;
  winner: TournamentParticipant;
  tournamentId: string;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit, OnDestroy {
  inProgressTournamentRows: InProgressTableRow[];
  inProgressTournamentColumns: string[] = ['position', 'tournamentName', 'competition', 'tournamentSystem', 'start',
    'end', 'currentRound', 'nextOpponent', 'actionButton'];

  endedTournamentRows: EndedTableRow[];
  endedTournamentColumns: string[] = ['position', 'tournamentName', 'competition', 'tournamentSystem', 'start', 'end',
    'winner', 'actionButton'];

  beforeStartTournamentRows: BeforeStartTableRow[];
  beforeStartTournamentColumns: string[] = ['position', 'tournamentName', 'competition', 'tournamentSystem', 'start',
    'end', 'actionButton'];

  lm = LocaleMessages;

  constructor(
    private tournamentService: TournamentService,
    private authService: AuthService,
    private router: Router,
    private mapToArray: MapToArrayPipe,
    private floatButtonService: FloatingButtonService
  ) {
  }

  ngOnInit() {
    const loggedUser = this.authService.getUserFromStorage();
    if (loggedUser) {
      this.tournamentService.getAllUserTournaments(loggedUser.id)
        .subscribe(dto => {
          this.beforeStartTournamentRows = [];
          this.inProgressTournamentRows = [];
          this.endedTournamentRows = [];

          this.mapToArray.transform(dto.tournaments).forEach((tuple: Tuple2<TournamentStatus, TournamentDTO[]>) => {
            if (tuple.left === TournamentStatus.BEFORE_START) {
              tuple.right.forEach(tournamentDto => {
                const pos = this.beforeStartTournamentRows.length + 1;
                this.beforeStartTournamentRows.push({
                  position: pos,
                  tournamentName: tournamentDto.name,
                  competitionType: {value: tournamentDto.competitionType, translationKey: tournamentDto.competitionType},
                  tournamentSystemType: {value: tournamentDto.systemType, translationKey: tournamentDto.systemType},
                  startDate: tournamentDto.startDate,
                  endDate: tournamentDto.endDate,
                  tournamentId: tournamentDto.id
                });
              });
            } else if (tuple.left === TournamentStatus.IN_PROGRESS) {
              tuple.right.forEach(tournamentDto => {
                const pos = this.inProgressTournamentRows.length + 1;
                this.inProgressTournamentRows.push({
                  position: pos,
                  tournamentName: tournamentDto.name,
                  competitionType: {value: tournamentDto.competitionType, translationKey: tournamentDto.competitionType},
                  tournamentSystemType: {value: tournamentDto.systemType, translationKey: tournamentDto.systemType},
                  startDate: tournamentDto.startDate,
                  endDate: tournamentDto.endDate,
                  currentRound: tournamentDto.currentRound,
                  nextOpponent: tournamentDto.nextOpponent,
                  tournamentId: tournamentDto.id
                });
              });
            } else if (tuple.left === TournamentStatus.ENDED) {
              tuple.right.forEach(tournamentDto => {
                const pos = this.endedTournamentRows.length + 1;
                this.endedTournamentRows.push({
                  position: pos,
                  tournamentName: tournamentDto.name,
                  competitionType: {value: tournamentDto.competitionType, translationKey: tournamentDto.competitionType},
                  tournamentSystemType: {value: tournamentDto.systemType, translationKey: tournamentDto.systemType},
                  startDate: tournamentDto.startDate,
                  endDate: tournamentDto.endDate,
                  winner: tournamentDto.winner,
                  tournamentId: tournamentDto.id
                });
              });
            }
          });
        });
    }

    this.prepareFloatButton();
  }

  openTournament(tournamentId: string) {
    this.router.navigate([RouterUrl.tournaments, tournamentId, 'dashboard']).catch();
  }

  private prepareFloatButton() {
    this.floatButtonService.setButtonClickAction(() => this.router.navigate([RouterUrl.createTournament]))
  }

  private cleanFloatButton() {
    this.floatButtonService.setButtonClickAction(null);
  }

  ngOnDestroy(): void {
    this.cleanFloatButton();
  }
}
//
//
// const tournamentInProgressMockRows: InProgressTableRow[] = [
//   {position: 1,
//     tournamentName: 'Turniej 1',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     currentRound: 2,
//     endDate: new Date(),
//     nextOpponent: {id: '123', name: 'Adam', surname: 'Smith'},
//     startDate: new Date(),
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   },
//   {position: 2,
//     tournamentName: 'Turniej 2',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     currentRound: 2,
//     endDate: new Date(),
//     nextOpponent: {id: '123', name: 'Adam', surname: 'Smith'},
//     startDate: new Date(),
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   },
//   {position: 3,
//     tournamentName: 'Turniej 3',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     currentRound: 2,
//     startDate: new Date(),
//     endDate: new Date(),
//     nextOpponent: {id: '123', name: 'Adam', surname: 'Smith'},
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   },
//   {position: 4,
//     tournamentName: 'Turniej 4',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     currentRound: 2,
//     endDate: new Date(),
//     nextOpponent: {id: '123', name: 'Adam', surname: 'Smith'},
//     tournamentId: '1234',
//     startDate: new Date(),
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS},
//   },
//   {position: 5,
//     tournamentName: 'Turniej 5',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     currentRound: 2,
//     startDate: new Date(),
//     endDate: new Date(),
//     nextOpponent: {id: '123', name: 'Adam', surname: 'Smith'},
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   }
// ];
//
// const tournamentBeforeStartMockRows: BeforeStartTableRow[] = [
//   {position: 1,
//     tournamentName: 'Turniej 1',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     endDate: new Date(),
//     startDate: new Date(),
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   },
//   {position: 2,
//     tournamentName: 'Turniej 2',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     endDate: new Date(),
//     startDate: new Date(),
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   },
//   {position: 3,
//     tournamentName: 'Turniej 3',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     startDate: new Date(),
//     endDate: new Date(),
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   },
//   {position: 4,
//     tournamentName: 'Turniej 4',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     endDate: new Date(),
//     tournamentId: '1234',
//     startDate: new Date(),
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS},
//   },
//   {position: 5,
//     tournamentName: 'Turniej 5',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     startDate: new Date(),
//     endDate: new Date(),
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   }
// ];
//
// const tournamentEndedMockRows: EndedTableRow[] = [
//   {position: 1,
//     tournamentName: 'Turniej 1',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     endDate: new Date(),
//     winnerId: {id: '123', name: 'Adam', surname: 'Smith'},
//     startDate: new Date(),
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   },
//   {position: 2,
//     tournamentName: 'Turniej 2',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     endDate: new Date(),
//     winnerId: {id: '123', name: 'Adam', surname: 'Smith'},
//     startDate: new Date(),
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   },
//   {position: 3,
//     tournamentName: 'Turniej 3',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     startDate: new Date(),
//     endDate: new Date(),
//     winnerId: {id: '123', name: 'Adam', surname: 'Smith'},
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   },
//   {position: 4,
//     tournamentName: 'Turniej 4',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     endDate: new Date(),
//     winnerId: {id: '123', name: 'Adam', surname: 'Smith'},
//     tournamentId: '1234',
//     startDate: new Date(),
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS},
//   },
//   {position: 5,
//     tournamentName: 'Turniej 5',
//     competitionType: {value: CompetitionType.CHESS, translationKey: CompetitionType.CHESS},
//     startDate: new Date(),
//     endDate: new Date(),
//     winnerId: {id: '123', name: 'Adam', surname: 'Smith'},
//     tournamentId: '1234',
//     tournamentSystemType: {value: TOURNAMENT_SYSTEM_TYPE.SWISS, translationKey: TOURNAMENT_SYSTEM_TYPE.SWISS}
//   }
// ];
