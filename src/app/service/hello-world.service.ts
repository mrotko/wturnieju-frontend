import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {RequestUrl} from '../config/requestUrl';


export interface HelloWorldMessage {
  id: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {

  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<HelloWorldMessage[]> {
    return this.http.get<HelloWorldMessage[]>(RequestUrl.helloWorld);
  }

  getMessageById(id: string) {
    return this.http.get(RequestUrl.helloWorld + '/' + id);
  }

  deleteMessage(id: string) {
    return this.http.delete(RequestUrl.helloWorld + '/' + id);
  }

  deleteMessages(ids: string []) {
    return this.http.delete(RequestUrl.helloWorld, {headers: {'data': JSON.stringify(ids)}});
  }

  addMessage(message: string) {
    return this.http.post(RequestUrl.helloWorld, {message: message});
  }
}
