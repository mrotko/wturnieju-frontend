import {Component} from '@angular/core';
import {LocaleMessages} from './locale-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  lm = LocaleMessages;

  title = 'wturnieju.pl';
}
