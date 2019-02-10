import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StartGameDialogComponent} from './start-game-dialog/start-game-dialog.component';
import {GameEditorComponent} from './game-editor.component';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../material/material.module';
import {SharedModule} from '../shared.module';
import {GameEditorService} from './game-editor.service';
import {GameEditorRoutingModule} from './game-editor-routing.module';
import {GameComponent} from './game/game.component';
import {MatDialogModule} from '@angular/material';
import {StartChessGameDialogContentComponent} from './start-chess-game-dialog-content/start-chess-game-dialog-content.component';
import {FinishGameDialogComponent} from './finish-game-dialog/finish-game-dialog.component';

@NgModule({
  exports: [
    GameEditorComponent
  ],
  declarations: [
    GameEditorComponent,
    StartGameDialogComponent,
    GameComponent,
    StartChessGameDialogContentComponent,
    FinishGameDialogComponent,
  ],
  imports: [
    CommonModule,
    GameEditorRoutingModule,
    SharedModule,
    HttpClientModule,
    MaterialModule,
    MatDialogModule
  ],
  providers: [
    GameEditorService
  ],
  entryComponents: [StartGameDialogComponent, FinishGameDialogComponent],
  bootstrap: []
})
export class GameEditorModule {
}
