import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flatNames'
})
export class FlatMapPipe implements PipeTransform {

  transform(value: Array<any>, prop: string): string {
    return value.map((item) => item[prop].name).join(', ');
  }

}
