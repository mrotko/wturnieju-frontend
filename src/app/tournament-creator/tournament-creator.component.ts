import {Component, OnInit} from '@angular/core';
import {LocaleMessages} from '../locale-messages';
import {TournamentCreatorConfig} from '../model/model';
import {TournamentCreatorService} from '../service/tournament-creator.service';

@Component({
  selector: 'app-tournament-creator',
  templateUrl: './tournament-creator.component.html',
  styleUrls: ['./tournament-creator.component.scss']
})
export class TournamentCreatorComponent implements OnInit {

  lm = LocaleMessages;
  config: TournamentCreatorConfig;


  constructor(
    private service: TournamentCreatorService
  ) { }

  ngOnInit() {
    this.service.getConfig().subscribe(config => {
      this.config = config;
      console.log(config);
    });
  }

}
