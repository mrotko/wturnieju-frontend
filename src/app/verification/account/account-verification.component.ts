import {Component} from '@angular/core';
import {VerificationService} from '../verification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractVerification} from '../abstract.verification';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent extends AbstractVerification {

  constructor(
    verificationService: VerificationService,
    route: ActivatedRoute,
    router: Router
  ) {
    super(verificationService, route, router);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log('run');
    this.verificationService.verifyAccount(this.token).subscribe(() => this.verificationStatus = true,
      () => this.verificationStatus = false)
  }
}
