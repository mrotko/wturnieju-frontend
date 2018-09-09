import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateStore} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {ConfigService} from '../service/config.service';
import {DefaultMissingTranslationHandler} from '../default-missing-translation-handler';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
      missingTranslationHandler: {provide: MissingTranslationHandler, useClass: DefaultMissingTranslationHandler},
      useDefaultLang: false
    })
  ],
  declarations: [],
  providers: [
    TranslateStore,
    ConfigService
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedModule { }
