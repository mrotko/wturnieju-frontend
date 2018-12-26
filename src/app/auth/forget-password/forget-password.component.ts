import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocaleMessages} from '../../locale-messages';
import {RouterUrl} from '../../config/routerUrl';
import {AuthService} from '../../service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ForgetPasswordForm} from '../../model/model';
import {SnackBarService} from '../../snack-bar.service';

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
    private snackbarService: SnackBarService
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
        () => this.snackbarService.openSuccess(this.lm.forgetPasswordSuccessMsg),
        () => this.snackbarService.openError(this.lm.unknownError)
      );
    }
  }
}
