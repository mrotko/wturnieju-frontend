import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) {
  }

  private load(filename: string) {
    return this.http.get('/assets/config/' + filename);
  }

  loadLocale() {
    return this.load('locale.json');
  }
}
