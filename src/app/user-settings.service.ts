import {Injectable} from '@angular/core';
import {AuthorityType, UserConfig, UserGrantedAuthority} from './model/model';
import {HttpClient} from '@angular/common/http';
import {RequestUrl} from './config/requestUrl';
import {Observable} from 'rxjs';
import {AuthService} from './service/auth.service';


interface ChangeAuthorityDTO {
  authorityType: AuthorityType,
  value: boolean
}

interface ChangePasswordDTO {
  oldPassword: string;
  newPassword: string;
}

interface ChangeEmailDTO {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUserConfig(): Observable<UserConfig> {
    return this.http.get<UserConfig>(RequestUrl.userSettings.config);
  }

  setAuthorities(enabledAuthorities: AuthorityType []): Observable<UserGrantedAuthority []> {
    return this.http.put<UserGrantedAuthority []>(RequestUrl.userSettings.authority, enabledAuthorities);
  }

  hasAuthority(authorityType: AuthorityType): boolean {
    const user = this.authService.getUserFromStorage();
    if (user && user.authorities) {
      const authority = user.authorities.find(value => value.authorityType === authorityType);
      return authority !== undefined;
    }
    return false;
  }

  changePassword(newPassword: string, oldPassword: string): Observable<any> {
    const dto: ChangePasswordDTO = {
      newPassword: newPassword,
      oldPassword: oldPassword
    };

    return this.http.put(RequestUrl.userSettings.password, dto);
  }

  changeEmail(email: string, password: string): Observable<any> {
    const dto: ChangeEmailDTO = {
      username: email,
      password: password
    };

    return this.http.put(RequestUrl.userSettings.email, dto);
  }
}
