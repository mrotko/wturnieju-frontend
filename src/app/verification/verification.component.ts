import {Component, OnInit} from '@angular/core';
import {VerificationService} from '../verification.service';
import {ActivatedRoute} from '@angular/router';
import {LocaleMessages} from '../locale-messages';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  protected token: string;

  protected verificationStatus: boolean | null = null;

  protected lm = LocaleMessages;

  constructor(
    protected verificationService: VerificationService,
    protected route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
  }
}