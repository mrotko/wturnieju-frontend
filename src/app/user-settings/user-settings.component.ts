import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../locale-messages';
import {AuthorityType, User, UserConfig} from '../model/model';
import {AuthService} from '../service/auth.service';
import {UserSettingsService} from '../user-settings.service';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

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

  constructor(
    private authService: AuthService,
    private userSettingsService: UserSettingsService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getUserFromStorage();
    this.userSettingsService.getUserConfig().subscribe(config => {
      this.userConfig = config;
      this.initAuthorityItems();
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
      this.snackBar.open(this.translate.instant(this.lm.success), this.translate.instant(this.lm.close), {
        duration: 1000,
        panelClass: 'success-snackbar'
      });
    });
  }
}
