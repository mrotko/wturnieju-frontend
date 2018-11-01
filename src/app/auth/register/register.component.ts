import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../../locale-messages';
import {AuthService} from '../../service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {RouterUrl} from '../../config/routerUrl';
import {Pattern, RegisterForm} from '../../model/model';
import {Router} from '@angular/router';
import {matchValidator} from '../../model/wt-validators';

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
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(Pattern.password)]),
      repeatPassword: new FormControl('')
    });
    this.registerForm.get('repeatPassword').setValidators(matchValidator('password'));
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(<RegisterForm>this.registerForm.value).subscribe(
        () => {
          this.snackBar.open(this.translate.instant(this.lm.accountCreated), this.translate.instant(this.lm.close),
            {panelClass: 'success-snackbar'});
          this.router.navigate([this.routerUrl.login]).catch();
        },
        err => {
          if (err.status === 400) {
            this.registerForm.get('username').setErrors({emailExists: true});
          }
        }
      );
    }
  }
}
