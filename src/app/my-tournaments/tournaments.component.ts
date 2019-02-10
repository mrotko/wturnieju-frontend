import {Component, OnDestroy, OnInit} from '@angular/core';
import {TournamentService} from '../tournament.service';
import {TournamentDTO, TournamentStatus, TranslatableValue, Tuple2} from '../model/model';
import {AuthService} from '../service/auth.service';
import {LocaleMessages} from '../locale-messages';
import {Router} from '@angular/router';
import {RouterUrl} from '../config/routerUrl';
import {MapToArrayPipe} from '../pipe/map-to-array.pipe';
import {FloatingButtonService} from '../floating-button.service';
import {MatTableDataSource} from '@angular/material';

interface BeforeStartTableRow {
  position: number;
  tournamentName: string;
  competitionType: TranslatableValue<string>;
  tournamentSystemType: TranslatableValue<string>;
  startDate: Date;
  endDate: Date;
  owner: boolean;
  tournamentId: string;
}

interface InProgressTableRow {
  position: number;
  tournamentName: string;
  competitionType: TranslatableValue<string>;
  tournamentSystemType: TranslatableValue<string>;
  startDate: Date;
  endDate: Date;
  owner: boolean;
  tournamentId: string;
}

interface EndedTableRow {
  position: number;
  tournamentName: string;
  competitionType: TranslatableValue<string>;
  tournamentSystemType: TranslatableValue<string>;
  startDate: Date;
  endDate: Date;
  owner: boolean;
  tournamentId: string;
}

interface TournamentFilter {
  owner: boolean;
  participant: boolean;
}

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit, OnDestroy {
  inProgressTournamentColumns: string[] = ['position', 'tournamentName', 'competition', 'tournamentSystem', 'start',
    'end', 'actionButton'];

  endedTournamentColumns: string[] = ['position', 'tournamentName', 'competition', 'tournamentSystem', 'start', 'end', 'actionButton'];

  beforeStartTournamentColumns: string[] = ['position', 'tournamentName', 'competition', 'tournamentSystem', 'start',
    'end', 'actionButton'];

  inProgressTournamentsDataSource: MatTableDataSource<InProgressTableRow>;
  beforeStartTournamentsDataSource: MatTableDataSource<BeforeStartTableRow>;
  endedTournamentsDataSource: MatTableDataSource<EndedTableRow>;


  lm = LocaleMessages;

  filter: TournamentFilter = {
    owner: true,
    participant: true
  };

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
          let beforeStartTournamentRows: BeforeStartTableRow [] = [];
          let inProgressTournamentRows: InProgressTableRow [] = [];
          let endedTournamentRows: EndedTableRow [] = [];

          this.mapToArray.transform(dto.tournaments).forEach((tuple: Tuple2<TournamentStatus, TournamentDTO[]>) => {
            if (tuple.left === TournamentStatus.BEFORE_START) {
              tuple.right.forEach((tournamentDto: TournamentDTO) => {
                const pos = beforeStartTournamentRows.length + 1;
                beforeStartTournamentRows.push({
                  position: pos,
                  tournamentName: tournamentDto.name,
                  competitionType: {
                    value: tournamentDto.competitionType,
                    translationKey: tournamentDto.competitionType
                  },
                  tournamentSystemType: {value: tournamentDto.systemType, translationKey: tournamentDto.systemType},
                  startDate: tournamentDto.startDate,
                  endDate: tournamentDto.endDate,
                  owner: tournamentDto.owner.id === loggedUser.id,
                  tournamentId: tournamentDto.id
                });
              });
            } else if (tuple.left === TournamentStatus.IN_PROGRESS) {
              tuple.right.forEach((tournamentDto: TournamentDTO) => {
                const pos = inProgressTournamentRows.length + 1;
                inProgressTournamentRows.push({
                  position: pos,
                  tournamentName: tournamentDto.name,
                  competitionType: {
                    value: tournamentDto.competitionType,
                    translationKey: tournamentDto.competitionType
                  },
                  tournamentSystemType: {value: tournamentDto.systemType, translationKey: tournamentDto.systemType},
                  startDate: tournamentDto.startDate,
                  endDate: tournamentDto.endDate,
                  owner: tournamentDto.owner.id === loggedUser.id,
                  tournamentId: tournamentDto.id
                });
              });
            } else if (tuple.left === TournamentStatus.ENDED) {
              tuple.right.forEach(tournamentDto => {
                const pos = endedTournamentRows.length + 1;
                endedTournamentRows.push({
                  position: pos,
                  tournamentName: tournamentDto.name,
                  competitionType: {
                    value: tournamentDto.competitionType,
                    translationKey: tournamentDto.competitionType
                  },
                  tournamentSystemType: {value: tournamentDto.systemType, translationKey: tournamentDto.systemType},
                  startDate: tournamentDto.startDate,
                  endDate: tournamentDto.endDate,
                  owner: tournamentDto.owner.id === loggedUser.id,
                  tournamentId: tournamentDto.id
                });
              });
            }
          });
          this.inProgressTournamentsDataSource = new MatTableDataSource<InProgressTableRow>(inProgressTournamentRows);
          this.beforeStartTournamentsDataSource = new MatTableDataSource<InProgressTableRow>(beforeStartTournamentRows);
          this.endedTournamentsDataSource = new MatTableDataSource<InProgressTableRow>(endedTournamentRows);

          this.inProgressTournamentsDataSource.filterPredicate = (data, filter) => {
            return this.rowFilter(data.owner);
          };
          this.beforeStartTournamentsDataSource.filterPredicate = (data, filter) => {
            return this.rowFilter(data.owner);
          };
          this.endedTournamentsDataSource.filterPredicate = (data, filter) => {
            return this.rowFilter(data.owner);
          };
        });
    }

    this.prepareFloatButton();
  }

  applyFilter() {
    this.inProgressTournamentsDataSource.filter = 'filter';
    this.beforeStartTournamentsDataSource.filter = 'filter';
    this.endedTournamentsDataSource.filter = 'filter';
  }

  private rowFilter(owner: boolean) {
    if (this.filter.owner) {
      if (owner) {
        return true;
      }
    }

    if (this.filter.participant) {
      if (!owner) {
        return true;
      }
    }

    return false;
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