import {OnInit} from '@angular/core';
import {VerificationService} from './verification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocaleMessages} from '../locale-messages';
import {RouterUrl} from '../config/routerUrl';

export abstract class AbstractVerification implements OnInit {

  token: string;

  verificationStatus: boolean | null = null;

  lm = LocaleMessages;

  protected constructor(
    protected verificationService: VerificationService,
    protected route: ActivatedRoute,
    protected router: Router
  ) {
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  redirectToHomePage() {
    this.router.navigate([RouterUrl.home]).catch();
  }
}