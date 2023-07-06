import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleBanWords',
  standalone: true,
})
export class ToggleBanWordsPipe implements PipeTransform {
  transform(value: boolean, args: string | string[]): string | string[] {
    return value ? args : [];
  }
}
