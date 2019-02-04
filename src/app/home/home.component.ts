import {Component, OnInit} from '@angular/core';
import {ScheduleService} from '../schedule.service';
import {ScheduleDto} from '../model/model';
import {TournamentService} from '../tournament.service';
import {SnackBarService} from '../snack-bar.service';
import {LocaleMessages} from '../locale-messages';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  lm = LocaleMessages;
  selectedDate: Date;
  tournamentsSchedules: ScheduleDto [];
  publicTournamentsIds: string [];

  private publicTournamentsIdsLoadedSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private scheduleService: ScheduleService,
    private tournamentService: TournamentService,
    private snackbarService: SnackBarService
  ) {
  }

  ngOnInit() {
    this.initSelectedDate();
    this.initPublicTournamentsIds();
    this.initTournamentsSchedules();
  }

  private initSelectedDate() {
    this.selectedDate = new Date();
    this.selectedDate.setHours(0);
    this.selectedDate.setMinutes(0);
    this.selectedDate.setSeconds(0);
    this.selectedDate.setMilliseconds(0);
  }

  private initTournamentsSchedules() {
    this.publicTournamentsIdsLoadedSubject.subscribe(isLoaded => {
      if (isLoaded) {
        this.loadTournamentsSchedules();
      } else {
        this.tournamentsSchedules = [];
      }
    })
  }

  private initPublicTournamentsIds() {
    this.tournamentService.getPublicTournamentsIds().subscribe(response => {
      this.publicTournamentsIds = response;
      this.publicTournamentsIdsLoadedSubject.next(true);
    }, () => {
      this.snackbarService.openError(this.lm.unknownError);
      this.publicTournamentsIdsLoadedSubject.next(false);
    });
  }

  loadTournamentsSchedules() {
    this.scheduleService.getTournamentsScheduleFixturesByDate(this.selectedDate, this.selectedDate).subscribe(
      response => this.tournamentsSchedules = response,
      () => this.snackbarService.openError(this.lm.unknownError)
    );
  }

  onSelectedDateChange() {
    this.loadTournamentsSchedules();
  }
}
