import {Component, OnInit} from '@angular/core';
import {CliService} from '../cli.service';
import {MatSnackBar} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import {LocaleMessages} from '../locale-messages';

@Component({
  selector: 'app-cli',
  templateUrl: './cli.component.html',
  styleUrls: ['./cli.component.scss']
})
export class CliComponent implements OnInit {

  lm = LocaleMessages;

  commandResponse: any;

  formattedResponse: string;

  constructor(
    private cliService: CliService,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {

  }

  isErrors(): boolean {
    return false;
    // return this.commandResponse
  }

  performCommand(command: string) {
    this.cliService.performCommand(command).subscribe(response => this.formattedResponse = JSON.stringify(response, null, 4), () => {
      this.snackBar.open(this.translate.instant(LocaleMessages.unknownError), this.translate.instant(LocaleMessages.close), {
        panelClass: 'error-snackbar',
        duration: 1000
      })
    });
  }

}
