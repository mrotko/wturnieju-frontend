import {Component, Input, OnInit} from '@angular/core';
import {TournamentDTO} from '../model/model';
import {LocaleMessages} from '../locale-messages';

@Component({
  selector: 'app-tournament-info',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.scss']
})
export class TournamentInfoComponent implements OnInit {

  lm = LocaleMessages;

  @Input() tournament: TournamentDTO;

  constructor() {
  }

  ngOnInit() {
  }

}
