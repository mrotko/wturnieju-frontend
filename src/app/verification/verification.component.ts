import {Component, OnInit} from '@angular/core';
import {VerificationService} from '../verification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocaleMessages} from '../locale-messages';
import {RouterUrl} from '../config/routerUrl';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  token: string;

  verificationStatus: boolean | null = null;

  lm = LocaleMessages;

  constructor(
    protected verificationService: VerificationService,
    protected route: ActivatedRoute,
    protected router: Router
  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }

  redirectToMainPage() {
    this.router.navigate([RouterUrl.home]).catch();
  }
}