import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TournamentService} from '../tournament.service';
import {Profile, TournamentDTO, TournamentTableDTO} from '../model/model';
import {LocaleMessages} from '../locale-messages';


interface SwissTournamentTable {
  rows: SwissTournamentTableRow [];
}

interface SwissTournamentTableRow {
  position: number;
  profile: Profile;
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

  lm = LocaleMessages;

  tournamentTable: TournamentTableDTO;

  swissTournamentColumns: string [] = ['position', 'fullName', 'points'];

  constructor(
    private tournamentService: TournamentService
  ) { }

  ngOnInit() {
    this.refreshTournamentTable();
  }

  refreshTournamentTable() {
    this.tournamentService.getTournamentTable(this.tournament.id).subscribe(dto => this.tournamentTable = dto);
  }

  getFullName(profile: Profile): string {
    const participant = this.tournament.participants.find(p => p.id === profile.id);
    return participant ? participant.fullName : '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.refreshTournamentTable();
  }
}
