import { AbstractControl, ValidationErrors } from '@angular/forms';

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export function ValidateEmail(
  control: AbstractControl,
): ValidationErrors | null {
  const emailIsValid = emailRegex.test(control.value);
  return emailIsValid ? null : { email: 'The email is invalid.' };
}
