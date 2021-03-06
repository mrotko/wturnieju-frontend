import {LocaleMessages} from '../locale-messages';
import {GameEditorService} from './game-editor.service';
import {GameFixtureDto, GameStatus, TournamentDTO} from '../model/model';
import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TournamentService} from '../tournament.service';
import {SnackBarService} from '../snack-bar.service';

@Component({
  selector: 'app-game-editor',
  templateUrl: './game-editor.component.html',
  styleUrls: ['./game-editor.component.scss']
})
export class GameEditorComponent implements OnInit, OnChanges {

  lm = LocaleMessages;

  @Input() tournament: TournamentDTO;

  gameFixtures: GameFixtureDto [] = [];

  @Output() reloadRequiredEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private tournamentService: TournamentService,
    private gameEditorService: GameEditorService,
    private snackbarService: SnackBarService,
  ) {
  }

  ngOnInit() {
    this.initGameFixtures();
  }

  private initGameFixtures() {
    this.tournamentService.getGameFixture(this.tournament.id).subscribe(
      response => this.gameFixtures = response.filter(game => game.gameStatus !== GameStatus.ENDED),
      () => this.snackbarService.openError(this.lm.unknownError)
    );
  }

  isLoaded(): boolean {
    return true;
  }

  handleGameStatusChange(status: GameStatus, game: GameFixtureDto) {
    if (status === GameStatus.ENDED) {
      const index = this.gameFixtures.findIndex(v => v.id === game.id);
      if (index >= 0) {
        this.gameFixtures.splice(index, 1);
      }
    }
    this.reloadRequiredEvent.emit(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initGameFixtures();
  }
}
