# Custom input

Muchas veces necesitamos un input personalizado, por ejemplo un input de fecha, un input de hora, un input de color, etc. Pero no queremos estar copiando y pegando el mismo código en diferentes formularios, entonces, creamos un componente. Y para hacer mejor la experiencia de desarrollo implementaremos la interfaz de Control Value Accessor para que se comporte como un input cualquiera y funcione en cualquier formulario de angular.

custom-input.component.html
```html
<select id="my-custom-input">
  <option value="js">Javascript</option>
  <option value="ts">TypeScript</option>
  <option value="rxjs">Rxjs</option>
  <option value="ngrx">NgRx</option>
</select>
```

custom-input.component.ts
```js
import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent {
  propagateChanges = (_:any) => { }
  onTouch = () => { }
  defaultValue: any = null

  writeValue(value: any): void {
    this.defaultValue = value ?? null;
  }

  registerOnChange(fn: any): void {
    this.propagateChanges = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  handleChangeValue(value: any) {
    this.onTouch()
    this.propagateChanges(value);
  }
}
```

### Uso

```html
<!-- Reactive Forms -->
<app-custom-input formControlName="language"></app-custom-input>
<!-- Template Driven Forms -->
<app-custom-input [(ngModel)]="language"></app-custom-input>
```