import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutName',
  standalone: true,
})
export class CutNamePipe implements PipeTransform {
  transform(value: string): string {
    const splitName = value.split(' ');
    if (splitName.length === 0) {
      return '';
    }
    if (splitName.length >= 2) {
      return `${splitName[0].at(0)}${splitName[1].at(0)}`;
    }
    return splitName[0].slice(0, 2);
  }
}
