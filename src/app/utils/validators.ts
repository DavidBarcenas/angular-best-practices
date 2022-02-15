import {AbstractControl, ValidationErrors} from '@angular/forms';

const emailRegex =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

export function ValidateEmail(
  control: AbstractControl,
): ValidationErrors | null {
  const emailIsValid = emailRegex.test(control.value);
  return emailIsValid ? null : {invalidEmail: 'The email is invalid.'};
}
