import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../locale-messages';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  lm = LocaleMessages;

  constructor() {
  }

  ngOnInit() {
  }
}
