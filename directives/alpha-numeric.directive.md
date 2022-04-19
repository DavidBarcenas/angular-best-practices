# Alpha Numeric

```js
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[alphaNumeric]'
})
export class AlphaNumericDirective {

  constructor() { }
  @HostListener('keypress') onkeypress(e) {
    const event = e || window.event;
    if (event) {
      return this.alfanumeric(event);
    }
  }

  alfanumeric(event: any) {
    const exp = /^[a-zA-zÑñáéíóúÁÉÍÓÚ0-9\_\- ,]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    return exp.test(inputChar);
  }

}
```