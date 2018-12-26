import {Component} from '@angular/core';
import {VerificationService} from '../verification.service';
import {ActivatedRoute} from '@angular/router';
import {VerificationComponent} from '../verification/verification.component';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent extends VerificationComponent{

  constructor(
    verificationService: VerificationService,
    route: ActivatedRoute
  ) {
    super(verificationService, route);
  }

  ngOnInit() {
    super.ngOnInit();
    this.verificationService.verifyEmailChange(this.token).subscribe(() => this.verificationStatus = true,
      () => this.verificationStatus = false);
  }

}
