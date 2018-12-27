import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FixtureDTO, TournamentDTO} from '../model/model';
import {TournamentService} from '../tournament.service';
import {LocaleMessages} from '../locale-messages';


@Component({
  selector: 'app-prepare-tournament-round-fixtures-dialog',
  templateUrl: './prepare-tournament-round-fixtures-dialog.component.html',
  styleUrls: ['./prepare-tournament-round-fixtures-dialog.component.scss']
})
export class PrepareTournamentRoundFixturesDialogComponent implements OnInit {

  lm = LocaleMessages;

  fixtures: FixtureDTO [];

  tableColumns = ['firstPlayer', 'secondPlayer', 'date'];

  constructor(
    private dialogRef: MatDialogRef<PrepareTournamentRoundFixturesDialogComponent>,
    private tournamentService: TournamentService,
    @Inject(MAT_DIALOG_DATA) private tournament: TournamentDTO
  ) {
  }

  ngOnInit() {
    this.tournamentService.prepareNextRound(this.tournament.id).subscribe(response => {
      return this.fixtures = response;
    });
  }

  getFullName(playerId: string): string {
    const participant = this.tournament.participants.find(p => p.id === playerId);
    return participant ? participant.fullName : '';
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.tournamentService.confirmNextRound(this.tournament.id, this.fixtures).subscribe(() => this.dialogRef.close());
  }
}