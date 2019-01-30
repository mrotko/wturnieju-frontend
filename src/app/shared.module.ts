import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from '@ngx-translate/core';
import {SpinnerComponent} from './spinner/spinner.component';
import {MaterialModule} from './material/material.module';
import {MapToArrayPipe} from './pipe/map-to-array.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './helper/jwt.interceptor';
import {ErrorInterceptor} from './helper/error.interceptor';

@NgModule({
  exports: [
    TranslateModule,
    SpinnerComponent,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    MapToArrayPipe,
    SpinnerComponent,
    ReactiveFormsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  declarations: [
    SpinnerComponent,
    MapToArrayPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {
}
