import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs/internal/Observable';


export interface HelloWorldMessage {
  id: string;
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class HelloWorldService {
  url = environment.apiUrl + '/hello-world/message';

  constructor(private http: HttpClient) { }


  getAllMessages(): Observable<HelloWorldMessage[]> {
    return this.http.get<HelloWorldMessage[]>(this.url);
  }

  getMessageById(id: string) {
    return this.http.get(this.url + '/' + id);
  }

  deleteMessage(id: string) {
    return this.http.delete(this.url + '/' + id);
  }

  deleteMessages(ids: string []) {
    return this.http.delete(this.url, {headers: {'data': JSON.stringify(ids)}});
  }

  addMessage(message: string) {
    return this.http.post(this.url, {message: message});
  }
}
