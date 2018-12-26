import {Component} from '@angular/core';
import {VerificationComponent} from '../verification/verification.component';
import {ActivatedRoute} from '@angular/router';
import {VerificationService} from '../verification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Pattern} from '../model/model';
import {matchValidator} from '../model/wt-validators';
import {SnackBarService} from '../snack-bar.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-password-verification',
  templateUrl: './password-verification.component.html',
  styleUrls: ['./password-verification.component.scss']
})
export class PasswordVerificationComponent extends VerificationComponent{

  resetPasswordFormGroup: FormGroup;

  constructor(
    verificationService: VerificationService,
    route: ActivatedRoute,
    private snackBarService: SnackBarService
  ) {
    super(verificationService, route);
  }

  ngOnInit() {
    super.ngOnInit();
    this.prepareResetPasswordFormGroup();
  }

  private prepareResetPasswordFormGroup() {
    this.resetPasswordFormGroup = new FormGroup({
      'password': new FormControl('', [Validators.required, Validators.pattern(Pattern.password)]),
      'repeatPassword': new FormControl('')
    });
    this.resetPasswordFormGroup.get('repeatPassword').setValidators(matchValidator('password'));
  }

  submitResetPassword() {
    if (this.resetPasswordFormGroup.valid) {
      const password = this.resetPasswordFormGroup.get('password').value;
      this.verificationService.verifyResetPassword(this.token, password).subscribe(
        () => this.snackBarService.openSuccess(this.lm.changePasswordSuccess),
        (error: HttpErrorResponse) => {
          if (error.status === 422) {
            this.snackBarService.openError(this.lm.passwordPatternError);
          } else {
            this.snackBarService.openError(this.lm.unknownError)
          }
        }
      );
    }
  }
}
