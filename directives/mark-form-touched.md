# Mark Form Touched

Directiva para hacer el touch a los campos de caulquier formulario que estemos usando, sin tener que copiar la misma línea de código en cada formulario.

```js
import { Directive, Self, HostListener } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Directive({
  selector: 'form[formGroup]'
})
export class MarkFormTouchedDirective {
  @HostListener('submit')
  onSubmit() {
    this.container.control.markAllAsTouched();
  }

  constructor(@Self() private container: ControlContainer) { }
}
```