import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[currency]',
})
export class CurrencyDirective {
  constructor(private _inputEl: ElementRef) {}

  @HostListener('keyup', ['$event'])
  onInput() {
    if (this._inputEl.nativeElement.value === '') return;
    const commasRemoved = this._inputEl.nativeElement.value.replace(/[^0-9.]/g, '');

    let toInt: number;
    let toLocale: string;

    if (commasRemoved.split('.').length > 1) {
      const decimal = isNaN(parseFloat(commasRemoved.split('.')[1]))
        ? ''
        : parseInt(commasRemoved.split('.')[1]);
      toInt = parseInt(commasRemoved);
      toLocale = toInt.toLocaleString('en-US') + '.' + decimal.toString().slice(0, 2);
    } else {
      toInt = parseInt(commasRemoved);
      toLocale = toInt.toLocaleString('en-US');
    }

    const position = this._inputEl.nativeElement.selectionStart;

    if (toLocale === 'NaN') {
      this._inputEl.nativeElement.value = '';
    } else {
      this._inputEl.nativeElement.value = toLocale;
    }

    setTimeout(() => {
      this._inputEl.nativeElement.setSelectionRange(position, position);
    }, 0);
  }
}
