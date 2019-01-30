import {Component} from '@angular/core';
import {VerificationService} from '../verification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractVerification} from '../abstract.verification';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent extends AbstractVerification {

  constructor(
    verificationService: VerificationService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(verificationService, route, router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.verificationService.verifyEmailChange(this.token).subscribe(() => this.verificationStatus = true,
      () => this.verificationStatus = false);
  }

}
