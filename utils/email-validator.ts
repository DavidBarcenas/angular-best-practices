import {AbstractControl, ValidationErrors} from '@angular/forms';

export function ValidateEmail(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const emailIsValid = emailRegex.test(control.value);
  return emailIsValid ? null : { invalidEmail: 'The email is invalid' };
}

/** Uso en formularios reactivos */
form = this.fb.group({
  email: [null, [Validators.required, ValidateEmail]],
  password: [null, [Validators.required]],
});