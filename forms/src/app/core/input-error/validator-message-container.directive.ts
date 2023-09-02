/* eslint-disable @angular-eslint/directive-class-suffix */
/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ViewContainerRef, inject } from '@angular/core';

@Directive({
  selector: '[validatorMessageContainer]',
  standalone: true,
  exportAs: 'validatorMessageContainer',
})
export class ValidatorMessageContainer {
  container = inject(ViewContainerRef);
}
