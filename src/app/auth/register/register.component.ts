import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../../locale-messages';
import {AuthService} from '../../service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegisterForm} from '../../model/register-form';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {RouterUrl} from '../../config/routerUrl';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)]),
    repeatPassword: new FormControl('', [
      Validators.required])
  }, this.passwordMatchValidator);

  lm = LocaleMessages;
  routerUrl = RouterUrl;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private translate: TranslateService) { }

  ngOnInit() {

  }

  onSubmit() {
    this.authService.register(<RegisterForm>this.registerForm.value).subscribe(
      () => this.snackBar.open(this.translate.instant(this.lm.accountCreated), this.translate.instant(this.lm.close),
        {panelClass: 'success-snackbar'}),
      err => {
        console.log(err);
        if (err.status === 400) {
          this.snackBar.open(this.translate.instant(this.lm.emailExists), this.translate.instant(this.lm.close),
            {panelClass: 'error-snackbar'});
        }
      },
      () => this.clearForm()
    );
  }

  clearForm() {
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    for (const fieldName of Object.keys(this.registerForm.controls)) {
      this.registerForm.get(fieldName).setErrors(null);
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    if (formGroup.get('password').value  !== formGroup.get('repeatPassword').value) {
      const errors = formGroup.get('repeatPassword').errors || [];
      errors['mismatch'] = true;
      formGroup.get('repeatPassword').setErrors(errors);
      return {'mismatch': true};
    }
    return null;
  }

  clearErrors(component: string) {
    if (this.registerForm.get(component).invalid && (component === 'password' || component === 'repeatPassword')) {
      this.registerForm.get(component).setValue('');
    }
    this.registerForm.get(component).setErrors(null);
    this.registerForm.get(component).markAsUntouched();
  }

  valid(component: string) {
    this.registerForm.get(component).updateValueAndValidity();
  }
}
