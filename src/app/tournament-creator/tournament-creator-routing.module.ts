import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TournamentCreatorComponent} from './tournament-creator.component';

const routes: Routes = [
  {path: '', component: TournamentCreatorComponent}
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TournamentCreatorRoutingModule {
}
