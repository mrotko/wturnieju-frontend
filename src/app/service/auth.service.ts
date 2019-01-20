import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {RequestUrl} from '../config/requestUrl';
import {ForgetPasswordForm, LoginForm, RegisterForm, User, UserGrantedAuthority} from '../model/model';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Router} from '@angular/router';
import {RouterUrl} from '../config/routerUrl';

@Injectable()
export class AuthService {

  loggedIn$ = new BehaviorSubject<User>(this.getUserFromStorage());

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(loginForm: LoginForm): Observable<void> {
    return this.http.post(RequestUrl.auth.login, loginForm, {observe: 'response'})
      .pipe(map((response: HttpResponse<User>) => {
        let token = response.headers.get('Authorization');
        if (token && token.startsWith('Bearer ')) {
          token = token.substr('Bearer '.length);
          const user = response.body;
          user.token = token;
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
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  saveUserInStorage(user: User) {
    if (user === null) {
      localStorage.removeItem('currentUser');
    } else {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  setAuthorities(authorities: UserGrantedAuthority []) {
    let user = this.getUserFromStorage();
    user.authorities = authorities;
    this.saveUserInStorage(user);
  }
}
