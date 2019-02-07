import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ParticipantDTO, ScheduleDto, TournamentDTO} from '../model/model';
import {TournamentService} from '../tournament.service';
import {LocaleMessages} from '../locale-messages';
import {SnackBarService} from '../snack-bar.service';
import {ObjectUtils} from '../utils/ObjectUtils';

@Component({
  selector: 'app-prepare-tournament-round-fixtures-dialog',
  templateUrl: './tournament-schedule-dialog.component.html',
  styleUrls: ['./tournament-schedule-dialog.component.scss']
})
export class TournamentScheduleDialogComponent implements OnInit {

  lm = LocaleMessages;

  schedule: ScheduleDto;

  tableColumns = ['homeParticipant', 'awayParticipant', 'startDate'];

  constructor(
    private dialogRef: MatDialogRef<TournamentScheduleDialogComponent>,
    private tournamentService: TournamentService,
    private snackbarService: SnackBarService,
    @Inject(MAT_DIALOG_DATA) private tournament: TournamentDTO
  ) {
  }

  ngOnInit() {
    this.tournamentService.generateSchedule(this.tournament.id, this.tournament.groups[0].id).subscribe(
      response => this.schedule = response,
      error => this.snackbarService.openError(this.lm.unknownError)
    );
  }

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    if (this.emptyDateFields()) {
      this.snackbarService.openError(this.lm.emptyDatesErrorMsg);
    } else {
      this.tournamentService.saveSchedule(this.tournament.id, this.schedule).subscribe(
        null,
        () => this.snackbarService.openError(this.lm.unknownError),
        () => this.dialogRef.close(true)
      );
      this.schedule = null;
    }
  }

  private emptyDateFields(): boolean {
    return ObjectUtils.exists(this.schedule.elements.find(e => !ObjectUtils.exists(e.startDate) && !e.bye));
  }

  isLoaded(): boolean {
    return ObjectUtils.exists(this.schedule);
  }

  getParticipantName(participant: ParticipantDTO) {
    if (!ObjectUtils.exists(participant)) {
      return null;
    }
    return participant.name;
  }
}