import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../service/auth.service';
import {map} from 'rxjs/operators';
import {RouterUrl} from '../config/routerUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthRequiredGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedIn().pipe(map(user => {
      if (!user) {
        this.router.navigate([RouterUrl.login]);
      }
      return !!user;
    }));
  }
}
