import {Component, Input, OnInit} from '@angular/core';
import {TournamentDTO} from '../model/model';

@Component({
  selector: 'app-tournament-tree',
  templateUrl: './tournament-tree.component.html',
  styleUrls: ['./tournament-tree.component.scss']
})
export class TournamentTreeComponent implements OnInit {

  @Input() tournament: TournamentDTO;

  constructor() {
  }

  ngOnInit() {
    console.log("reload");
  }

}
