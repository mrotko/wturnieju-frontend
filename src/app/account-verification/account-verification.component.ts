import {Component} from '@angular/core';
import {VerificationComponent} from '../verification/verification.component';
import {VerificationService} from '../verification.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.scss']
})
export class AccountVerificationComponent extends VerificationComponent{

  constructor(
    verificationService: VerificationService,
    route: ActivatedRoute
  ) {
    super(verificationService, route);
  }

  ngOnInit() {
    super.ngOnInit();
    this.verificationService.verifyAccount(this.token).subscribe(() => this.verificationStatus = true,
      () => this.verificationStatus = false)
  }
}
