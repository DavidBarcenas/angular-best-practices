import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatch]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true,
    },
  ],
})
export class PasswordMatchDirective implements Validator {
  constructor() {}

  validate(control: AbstractControl<string>): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    const error = { passwordMatch: true };
    if (password?.value === confirmPassword?.value) {
      return null;
    }
    confirmPassword?.setErrors(error);
    return error;
  }
}
