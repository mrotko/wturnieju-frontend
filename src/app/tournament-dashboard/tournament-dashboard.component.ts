import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TOURNAMENT_STATUS, TournamentDTO} from '../model/model';
import {TournamentService} from '../tournament.service';

@Component({
  selector: 'app-tournament-dashboard',
  templateUrl: './tournament-dashboard.component.html',
  styleUrls: ['./tournament-dashboard.component.scss']
})
export class TournamentDashboardComponent implements OnInit {

  TOURNAMENT_STATUS = TOURNAMENT_STATUS;

  tournament: TournamentDTO;

  tournamentId: string;

  constructor(
    private router: ActivatedRoute,
    private tournamentService: TournamentService
  ) {
  }

  ngOnInit() {
    this.tournamentId = this.router.snapshot.paramMap.get('id');
    this.tournamentService.getTournament(this.tournamentId).subscribe(dto => this.tournament = dto);
  }
}
