import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VerificationService} from '../verification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {AbstractVerification} from '../abstract.verification';
import {SnackBarService} from '../../snack-bar.service';
import {matchValidator} from '../../model/wt-validators';
import {AuthConfigService} from '../../auth-config.service';

@Component({
  selector: 'app-password-verification',
  templateUrl: './password-verification.component.html',
  styleUrls: ['./password-verification.component.scss']
})
export class PasswordVerificationComponent extends AbstractVerification {

  resetPasswordFormGroup: FormGroup;

  constructor(
    private authConfigService: AuthConfigService,
    verificationService: VerificationService,
    route: ActivatedRoute,
    router: Router,
    private snackBarService: SnackBarService
  ) {
    super(verificationService, route, router);
  }

  ngOnInit() {
    super.ngOnInit();
    this.prepareResetPasswordFormGroup();
  }

  private prepareResetPasswordFormGroup() {
    this.resetPasswordFormGroup = new FormGroup({
      'password': new FormControl('', []),
      'repeatPassword': new FormControl('')
    });
    this.authConfigService.init().subscribe(() => this.initPasswordsValidators());

  }

  private initPasswordsValidators() {
    this.resetPasswordFormGroup.get('password').setValidators([Validators.required, Validators.pattern(this.getPasswordPattern())]);
    this.resetPasswordFormGroup.get('repeatPassword').setValidators(matchValidator('password'));
  }

  private getPasswordPattern() {
    return this.authConfigService.getPasswordPattern();
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

  private getPasswordInputText(): string {
    return this.resetPasswordFormGroup.get('password').value;
  }

  getPasswordErrMsg() {
    return this.authConfigService.getPasswordPatterErrMsg(this.getPasswordInputText());
  }
}
