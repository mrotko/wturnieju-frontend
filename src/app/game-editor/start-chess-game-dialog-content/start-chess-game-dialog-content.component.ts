import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-start-chess-game-dialog-content',
  templateUrl: './start-chess-game-dialog-content.component.html',
  styleUrls: ['./start-chess-game-dialog-content.component.scss']
})
export class StartChessGameDialogContentComponent implements OnInit {

  @Output() startGameDate: Date;

  constructor() { }

  ngOnInit() {

  }
}
