import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {RequestUrl} from '../config/requestUrl';
import {
  AuthConfigDto,
  ForgetPasswordForm,
  LoginForm,
  RegisterForm,
  User,
  UserDTO,
  UserGrantedAuthority
} from '../model/model';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Router} from '@angular/router';
import {RouterUrl} from '../config/routerUrl';
import {ObjectUtils} from '../utils/ObjectUtils';

@Injectable()
export class AuthService {

  loggedIn$ = new BehaviorSubject<User>(this.getUserFromStorage());

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  login(loginForm: LoginForm): Observable<void> {
    return this.http.post(RequestUrl.auth.login, loginForm, {observe: 'response'})
      .pipe(map((response: HttpResponse<User>) => {
        let token = response.headers.get('Authorization');
        if (token && token.startsWith('Bearer ')) {
          token = token.substr('Bearer '.length);
          const user = response.body;
          user.token = token;
          this.setKeepLogin(loginForm.keepLogin);
          this.updateUserInStorage(user);
        }
      }));
  }

  isAccountActive(email: string): Observable<boolean> {
    return this.http.get<boolean>(RequestUrl.auth.active + email);
  }

  register(registerForm: RegisterForm): Observable<User> {
    return this.http.post<User>(RequestUrl.auth.register, registerForm);
  }

  forgetPassword(forgetPassword: ForgetPasswordForm) {
    return this.http.post(RequestUrl.auth.forgetPassword, forgetPassword);
  }

  logout() {
    this.updateUserInStorage(null);
    this.router.navigate([RouterUrl.home]).catch();
  }

  isLoggedIn(): Observable<User> {
    return this.loggedIn$.asObservable();
  }

  updateUserInStorage(user: User | null) {
    this.saveUserInStorage(user);
    this.loggedIn$.next(user);
  }

  getUserFromStorage(): User {
    return JSON.parse(this.getUserStorage().getItem('currentUser'));
  }

  saveUserInStorage(user: User) {
    if (user === null) {
      this.getUserStorage().removeItem('currentUser');
      localStorage.removeItem('keepLogin');
    } else {
      this.getUserStorage().setItem('currentUser', JSON.stringify(user));
    }
  }

  updatePersonalData(userDto: UserDTO) {
    const user = this.getUserFromStorage();
    if (ObjectUtils.exists(user)) {
      user.name = userDto.name;
      user.surname = userDto.surname;
      this.saveUserInStorage(user);
    }
  }

  setAuthorities(authorities: UserGrantedAuthority []) {
    let user = this.getUserFromStorage();
    user.authorities = authorities;
    this.saveUserInStorage(user);
  }

  private getUserStorage(): Storage {
    if (this.isKeepLogin()) {
      return localStorage;
    } else {
      return sessionStorage;
    }
  }

  private setKeepLogin(keepLogin: boolean) {
    localStorage.setItem('keepLogin', JSON.stringify(keepLogin));
  }

  private isKeepLogin(): boolean {
    return JSON.parse(localStorage.getItem('keepLogin'));
  }

  public getAuthConfig(): Observable<AuthConfigDto> {
    return this.http.get<AuthConfigDto>(RequestUrl.auth.config);
  }
}
