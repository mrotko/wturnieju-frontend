import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {RequestUrl} from './config/requestUrl';
import {DateUtils} from './utils/DateUtils';
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

  getTournamentsScheduleFixturesByDate(dateFrom: Date, dateTo: Date): Observable<ScheduleDto []> {
    return this.http.get<ScheduleDto []>(RequestUrl.schedule.schedule + '/public', {
      params: {
        dateFrom: DateUtils.toYYYYMMDD(dateFrom),
        dateTo: DateUtils.toYYYYMMDD(dateTo)
      }
    });
  }
}
