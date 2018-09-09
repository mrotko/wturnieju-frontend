import {MissingTranslationHandler, MissingTranslationHandlerParams} from '@ngx-translate/core';

export class DefaultMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): any {
    return '$' + params.key + '$';
  }
}
