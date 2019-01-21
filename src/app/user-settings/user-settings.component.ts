import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../locale-messages';
import {AuthorityType, ExceptionErrorDTO, Pattern, User, UserConfig} from '../model/model';
import {AuthService} from '../service/auth.service';
import {UserSettingsService} from '../user-settings.service';
import {SnackBarService} from '../snack-bar.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {matchValidator} from '../model/wt-validators';
import {HttpErrorResponse} from '@angular/common/http';

interface AuthorityItem {
  authorityType: AuthorityType,
  enabled: boolean
}

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  lm = LocaleMessages;

  currentUser: User;

  userConfig: UserConfig;

  authorityItems: AuthorityItem [];

  changePasswordForm: FormGroup;

  changeEmailForm: FormGroup;

  changePersonalDataForm: FormGroup;

  constructor(
    private authService: AuthService,
    private userSettingsService: UserSettingsService,
    private snackbarService: SnackBarService
  ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getUserFromStorage();
    this.userSettingsService.getUserConfig().subscribe(config => {
      this.userConfig = config;
      this.initAuthorityItems();
    });

    this.prepareChangePasswordForm();
    this.prepareChangeEmailForm();
    this.prepareChangePersonalDataForm();
  }

  private prepareChangePasswordForm() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.pattern(Pattern.password)]),
      repeatPassword: new FormControl()
    });
    this.changePasswordForm.get('repeatPassword').setValidators(matchValidator('newPassword'));
  }

  private prepareChangeEmailForm() {
    this.changeEmailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  private prepareChangePersonalDataForm() {
    this.changePersonalDataForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required])
    });
  }

  initAuthorityItems() {
    this.authorityItems = this.userConfig.authorityTypes.map(authorityType => {
      return {
        authorityType: authorityType,
        enabled: this.userSettingsService.hasAuthority(authorityType)
      }
    });
  }

  setAuthorities() {
    const onlyEnabled = this.authorityItems
      .filter(item => item.enabled)
      .map(item => item.authorityType);

    this.userSettingsService.setAuthorities(onlyEnabled).subscribe(userAuthorities => {
      this.authService.setAuthorities(userAuthorities);
      this.snackbarService.openSuccess(this.lm.success, this.lm.close);
    });
  }

  changePasswordSubmit() {
    if (this.changePasswordForm.valid) {
      const newPassword = this.changePasswordForm.get('newPassword').value;
      const oldPassword = this.changePasswordForm.get('oldPassword').value;

      this.userSettingsService.changePassword(newPassword, oldPassword).subscribe(() => {
        this.authService.logout();
        this.snackbarService.openSuccess(this.lm.changePasswordSuccess, this.lm.close);
      }, (error: HttpErrorResponse) => {
        if (error.status === 422) {
          const errorBody: ExceptionErrorDTO = error.error;

          if (errorBody.simpleClassName === 'IncorrectPasswordException') {
            this.snackbarService.openError(this.lm.incorrectOldPassword, this.lm.close);
          } else if (errorBody.simpleClassName === 'InvalidFormatException') {
            this.snackbarService.openError(this.lm.passwordPatternError, this.lm.close);
          } else {
            this.snackbarService.openError(this.lm.unknownError, this.lm.close);
          }
        } else {
          this.snackbarService.openError(this.lm.unknownError, this.lm.close);
        }
      });
    }
  }

  changeEmailSubmit() {
    if (this.changeEmailForm.valid) {
      const email = this.changeEmailForm.get('email').value;
      const password = this.changeEmailForm.get('password').value;

      this.userSettingsService.changeEmail(email, password).subscribe(() => {
        this.authService.logout();
        this.snackbarService.openSuccess(this.lm.changeEmailSuccessMsg, this.lm.close);
      }, (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.snackbarService.openError(this.lm.emailExists, this.lm.close);
        } else if (error.status === 422) {
          const errorBody: ExceptionErrorDTO = error.error;

          if (errorBody.simpleClassName === 'IncorrectPasswordException') {
            this.snackbarService.openError(this.lm.incorrectPassword, this.lm.close);
          } else if (errorBody.simpleClassName === 'InvalidFormatException') {
            this.snackbarService.openError(this.lm.badEmailError, this.lm.close);
          }
        } else {
          this.snackbarService.openError(this.lm.unknownError, this.lm.close);
        }
      });
    }
  }

  changePersonalDataSubmit() {
    if (this.changePersonalDataForm.valid) {
      const name = this.changePersonalDataForm.get('name').value;
      const surname = this.changePersonalDataForm.get('surname').value;

      this.userSettingsService.changePersonalData(name, surname).subscribe(
        user => {
          this.authService.updatePersonalData(user);
          this.currentUser = this.authService.getUserFromStorage();
          this.snackbarService.openSuccess(this.lm.success);
        },
        error => this.snackbarService.openError(this.lm.unknownError)
      );
    }
  }
}
