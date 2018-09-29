import {RouterUrl} from '../../config/routerUrl';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../../locale-messages';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {LoginForm} from '../../model/model';

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
    private snackBar: MatSnackBar,
    private translate: TranslateService
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
          if (err.status === 401) {
            this.snackBar.open(this.translate.instant(this.lm.loginError), this.translate.instant(this.lm.close));
          } else {
            console.log(err);
            this.snackBar.open(this.translate.instant(this.lm.unknownError), this.translate.instant(this.lm.close));
          }
        }
      );
    }
  }
}
