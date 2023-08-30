import { Directive, HostBinding, inject } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { CONTROL_DATA } from '../control-data.token';
import { KeyValue } from '@angular/common';
import { DynamicControl } from '../dynamic-forms.model';

export const compareFn = (a: KeyValue<string, DynamicControl>, b: KeyValue<string, DynamicControl>): number => {
  return a.value.order - b.value.order;
};

export const dynamicControlProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true }),
};

@Directive()
export class BaseDynamicControl {
  @HostBinding('class') hostClass = 'form-field block mb-2';

  control = inject(CONTROL_DATA);
}
