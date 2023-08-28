import { Directive, HostBinding, inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { CONTROL_DATA } from '../control-data.token';

@Directive()
export class BaseDynamicControl {
  @HostBinding('class') hostClass = 'form-field block mb-2';
  private parentForm = inject(ControlContainer);
  control = inject(CONTROL_DATA);

  get formGroup(): FormGroup {
    return this.parentForm.control as FormGroup;
  }
}
