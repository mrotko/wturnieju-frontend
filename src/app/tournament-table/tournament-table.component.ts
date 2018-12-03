import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TournamentService} from '../tournament.service';
import {TournamentDTO, TournamentTableDTO} from '../model/model';
import {LocaleMessages} from '../locale-messages';


interface SwissTournamentTable {
  rows: SwissTournamentTableRow [];
}

interface SwissTournamentTableRow {
  position: number;
  profileId: string;
  played: number;
  points: number;
  wins: number;
  draws: number;
  loses: number;
  smallPoints: number;
}

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

  swissTournamentColumns: string [] = ['position', 'fullName', 'points'];

  constructor(
    private tournamentService: TournamentService
  ) { }

  ngOnInit() {
  }

  initTournamentTable() {
    this.tournamentService.getTournamentTable(this.tournament.id).subscribe(dto => this.tournamentTable = dto);
  }

  getFullName(profileId: String): string {
    const participant = this.tournament.participants.find(p => p.id === profileId);
    return participant ? participant.fullName : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initTournamentTable();
  }
}
