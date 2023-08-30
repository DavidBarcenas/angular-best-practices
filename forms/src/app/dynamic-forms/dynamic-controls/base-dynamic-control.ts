import { Directive, HostBinding, inject } from '@angular/core';
import { ControlContainer, FormGroup } from '@angular/forms';
import { CONTROL_DATA } from '../control-data.token';

export const dynamicControlProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true }),
};

@Directive()
export class BaseDynamicControl {
  @HostBinding('class') hostClass = 'form-field block mb-2';

  control = inject(CONTROL_DATA);
}
