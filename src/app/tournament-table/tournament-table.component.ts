import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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

  @Output() reloadRequiredEvent: EventEmitter<boolean> = new EventEmitter();

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
    this.tournamentService.getTournamentTable(this.tournament.id).subscribe(dto => this.tournamentTable = dto);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initTournamentTable();
  }

  private setCurrentTournamentColumns() {
    this.tableColumns = this.tournament.tableColumns;
  }
}
