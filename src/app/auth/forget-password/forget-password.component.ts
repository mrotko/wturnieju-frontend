import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocaleMessages} from '../../locale-messages';
import {RouterUrl} from '../../config/routerUrl';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {ForgetPasswordForm} from '../../model/model';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss', '../auth.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordFormGroup: FormGroup;

  lm = LocaleMessages;
  routerUrl = RouterUrl;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.forgetPasswordFormGroup = new FormGroup({
      username: new FormControl('', [Validators.email, Validators.required])
    });
  }

  onSubmit() {
    if (this.forgetPasswordFormGroup.valid) {
      this.authService.forgetPassword(<ForgetPasswordForm>this.forgetPasswordFormGroup.value).subscribe(
        () => this.snackBar.open(this.translate.instant(this.lm.success), this.translate.instant(this.lm.close)),
        () => this.snackBar.open(this.translate.instant(this.lm.unknownError), this.translate.instant(this.lm.close))
      );
    }
  }
}
