import { Directive, HostListener, Self } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Directive({
  selector: '[appMarkFormTouched]',
})
export class MarkFormTouchedDirective {
  @HostListener('submit')
  onSubmit() {
    this.container.control?.markAllAsTouched();
  }

  constructor(@Self() private container: ControlContainer) {}
}
