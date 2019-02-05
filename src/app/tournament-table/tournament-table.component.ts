import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TournamentService} from '../tournament.service';
import {TournamentDTO, TournamentTableColumnType, TournamentTableDTO} from '../model/model';
import {LocaleMessages} from '../locale-messages';


@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrls: ['./tournament-table.component.scss']
})
export class TournamentTableComponent implements OnInit, OnChanges {

  @Input() tournament: TournamentDTO;

  lm = LocaleMessages;

  tournamentTable: TournamentTableDTO;

  tableColumns: TournamentTableColumnType [];

  constructor(
    private tournamentService: TournamentService
  ) {
  }

  ngOnInit() {
    this.setCurrentTournamentColumns();
  }

  initTournamentTable() {
    this.tournamentService.getTournamentTable(this.tournament.id, this.getFirstGroupId()).subscribe(dto => this.tournamentTable = dto);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initTournamentTable();
  }

  private setCurrentTournamentColumns() {
    this.tableColumns = this.tournament.tableColumns;
  }

  getFirstGroupId() {
    return this.tournament.groups[0].id;
  }
}
