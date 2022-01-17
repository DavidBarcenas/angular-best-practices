import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformId'
})
export class TransformIdPipe implements PipeTransform {

  transform(value: number): string {
    return value.toString().padStart(3, '0');
  }

}
