import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {SpinnerComponent} from './spinner/spinner.component';
import {MaterialModule} from './material/material.module';

@NgModule({
  exports: [
    TranslateModule,
    SpinnerComponent,
    MaterialModule
  ],
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
