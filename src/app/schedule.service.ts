import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RequestUrl} from './config/requestUrl';
import {HttpClient} from '@angular/common/http';
import {ScheduleDto} from './model/model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private http: HttpClient
  ) {
  }

  getTournamentsScheduleFixturesByDate(beginDayDateTime: Date): Observable<ScheduleDto []> {
    return this.http.get<ScheduleDto []>(RequestUrl.schedule.schedule + '/public', {
      params: {
        beginDayDateTime: beginDayDateTime.toISOString()
      }
    });
  }
}
