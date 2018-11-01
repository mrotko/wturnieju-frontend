import {Pipe, PipeTransform} from '@angular/core';
import {Tuple2} from '../model/model';

@Pipe({
  name: 'mapToArray'
})
export class MapToArrayPipe implements PipeTransform {

  transform(value: {}, args?: any): Array<Tuple2> {
    if (!value) {
      return [];
    }
    return Object.entries(value).map(([first, second]) => (<Tuple2>{first, second}));
  }
}
