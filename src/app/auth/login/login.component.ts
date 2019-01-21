import {RouterUrl} from '../../config/routerUrl';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../../locale-messages';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginForm} from '../../model/model';
import {SnackBarService} from '../../snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../auth.component.scss']
})
export class LoginComponent implements OnInit {
  lm = LocaleMessages;
  routerUrl = RouterUrl;
  returnUrl: string;

  loginFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackBarService
    ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      keepLogin: new FormControl()
    });
  }

  onSubmit() {
    if (this.loginFormGroup.valid) {
      this.authService.login(<LoginForm>this.loginFormGroup.value).subscribe(
        () => this.router.navigate([this.returnUrl]),
        err => {
          if (err.status === 403) {
            const email = this.loginFormGroup.get('username').value;
            this.authService.isAccountActive(email).subscribe(response => {
              if (response) {
                this.snackbarService.openError(this.lm.loginError);
              } else {
                this.snackbarService.openError(this.lm.accountInactiveErrorMsg);
              }
            }, err => {
              if (err.status === 404) {
                this.snackbarService.openError(this.lm.loginError);
              } else {
                this.snackbarService.openError(this.lm.unknownError);
              }
            });
          } else {
            this.snackbarService.openError(this.lm.unknownError);
          }
        }
      );
    }
  }
}
