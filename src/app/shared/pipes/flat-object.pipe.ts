/* eslint-disable @typescript-eslint/no-explicit-any */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'flatObject',
})
export class FlatObjectPipe implements PipeTransform {
  transform(value: any, key: string | string[]): any {
    if (Array.isArray(key)) {
      return this.flatten(key, value);
    }
    return value[key];
  }

  private flatten(keys: string[], obj: any) {
    keys.forEach(key => {
      obj = obj[key];
    });
    return obj;
  }
}
