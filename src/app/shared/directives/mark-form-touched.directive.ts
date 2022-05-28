import { Directive, HostListener, Self } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Directive({
  selector: '[markFormTouched]',
})
export class MarkFormTouchedDirective {
  constructor(@Self() private container: ControlContainer) {}

  @HostListener('submit')
  onSubmit() {
    this.container.control?.markAllAsTouched();
  }
}
