import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RequestUrl} from './config/requestUrl';

@Injectable({
  providedIn: 'root'
})
export class CliService {

  constructor(
    private http: HttpClient
  ) { }


  performCommand(command: string): Observable<{}> {
    return this.http.post(RequestUrl.cli, {command: command});
  }
}
