import { Directive, HostBinding, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CONTROL_DATA } from '../control-data.token';
import { KeyValue } from '@angular/common';
import { DynamicControl } from '../dynamic-forms.model';
import { banWord } from 'src/app/reactive-forms/validators/ban-word.validator';

export const compareFn = (a: KeyValue<string, DynamicControl>, b: KeyValue<string, DynamicControl>): number => {
  return a.value.order - b.value.order;
};

export const dynamicControlProvider = {
  provide: ControlContainer,
  useFactory: () => inject(ControlContainer, { skipSelf: true }),
};

@Directive()
export class BaseDynamicControl implements OnInit {
  @HostBinding('class') hostClass = 'form-field block mb-2';

  private parentGroupDir = inject(ControlContainer);

  control = inject(CONTROL_DATA);

  formControl: AbstractControl = new FormControl(
    this.control.config.value,
    this.resolveValidators(this.control.config)
  );

  ngOnInit(): void {
    (this.parentGroupDir.control as FormGroup).addControl(this.control.controlKey, this.formControl);
  }

  private resolveValidators({
    validators = {},
  }: DynamicControl): ((control: AbstractControl) => ValidationErrors | null)[] {
    return (Object.keys(validators) as Array<keyof typeof validators>).map((validatorKey) => {
      const validatorValue = validators[validatorKey];
      if (validatorKey === 'required') {
        return Validators.required;
      }
      if (validatorKey === 'requiredTrue') {
        return Validators.requiredTrue;
      }
      if (validatorKey === 'email') {
        return Validators.email;
      }
      if (validatorKey === 'minLength' && typeof validatorValue === 'number') {
        return Validators.minLength(validatorValue);
      }
      if (validatorKey === 'banWords' && Array.isArray(validatorValue)) {
        return banWord(validatorValue);
      }
      return Validators.nullValidator;
    });
  }
}
