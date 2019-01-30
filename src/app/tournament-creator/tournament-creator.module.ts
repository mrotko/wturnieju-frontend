import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TournamentCreatorService} from './tournament-creator.service';
import {SharedModule} from '../shared.module';
import {TennisComponent} from './tennis/tennis.component';
import {FootballComponent} from './football/football.component';
import {CustomComponent} from './custom/custom.component';
import {ChessComponent} from './chess/chess.component';
import {TournamentCreatorComponent} from './tournament-creator.component';
import {TournamentCreatorRoutingModule} from './tournament-creator-routing.module';

@NgModule({
  declarations: [
    TennisComponent,
    FootballComponent,
    CustomComponent,
    ChessComponent,
    TournamentCreatorComponent
  ],
  imports: [
    TournamentCreatorRoutingModule,
    CommonModule,
    SharedModule,
  ],
  providers: [
    TournamentCreatorService
  ]
})
export class TournamentCreatorModule {
}
