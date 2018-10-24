import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'mapToArray'
})
export class MapToArrayPipe implements PipeTransform {

  transform(value: {}, args?: any): Array<{}> {
    if (!value) {
      return [];
    }
    return Object.entries(value).map(([k, v]) => ({k, v}));
  }

}
