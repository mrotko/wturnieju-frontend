import {Component, OnInit} from '@angular/core';
import {ForgetPasswordForm} from '../../model/forget-password-form';
import {FormControl, Validators} from '@angular/forms';
import {LocaleMessages} from '../../locale-messages';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss', '../auth.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  emailFieldControl = new FormControl('', [Validators.email, Validators.required]);
  model: ForgetPasswordForm = {email: ''};
  lm = LocaleMessages;

  constructor() {}

  ngOnInit() {
    console.log(this.model.email);
  }

  validate() {
    this.emailFieldControl.updateValueAndValidity();
    console.log(this.model.email);
  }

  clearError() {
    const val = this.emailFieldControl.value;
    this.emailFieldControl.reset();
    this.emailFieldControl.setValue(val);
    this.emailFieldControl.setErrors(null);
    this.emailFieldControl.markAsPristine();
  }
}
