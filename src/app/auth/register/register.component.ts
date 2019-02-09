import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../../locale-messages';
import {AuthService} from '../../service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RouterUrl} from '../../config/routerUrl';
import {RegisterForm} from '../../model/model';
import {Router} from '@angular/router';
import {matchValidator} from '../../model/wt-validators';
import {SnackBarService} from '../../snack-bar.service';
import {AuthConfigService} from '../../auth-config.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  lm = LocaleMessages;

  routerUrl = RouterUrl;

  constructor(
    private authService: AuthService,
    private snackbarService: SnackBarService,
    private authConfigService: AuthConfigService,
    private router: Router) {
  }

  ngOnInit() {
    this.initRegisterForm();
    this.authConfigService.init().subscribe(result => {
      if (result) {
        this.initPasswordValidators();
      }
    });
  }

  private initPasswordValidators() {
    this.registerForm.get('password').setValidators([Validators.required, Validators.pattern(this.getPasswordPattern())]);
    this.registerForm.get('repeatPassword').setValidators(matchValidator('password'));
  }


  private initRegisterForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', []),
      repeatPassword: new FormControl('')
    });
  }

  private getPasswordPattern(): string {
    return this.authConfigService.getPasswordPattern();
  }

  private getPasswordInput(): string {
    return this.registerForm.get('password').value;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(<RegisterForm>this.registerForm.value).subscribe(
        () => {
          this.snackbarService.openSuccess(this.lm.accountCreated);
          this.router.navigate([this.routerUrl.login]).catch();
        },
        err => {
          if (err.status === 409) {
            this.registerForm.get('username').setErrors({emailExists: true});
          }
        }
      );
    }
  }

  private getPasswordPatterErrMsg() {
    return this.authConfigService.getPasswordPatterErrMsg(this.getPasswordInput());
  }
}
