import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {VerificationService} from './verification.service';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {

  constructor(
    private verificationService: VerificationService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const token = next.queryParamMap.get('token');
    const service = next.firstChild.routeConfig.path;

    return this.verificationService.checkToken(token, service);
  }
}
