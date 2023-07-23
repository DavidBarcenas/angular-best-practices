import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatch(control: AbstractControl<string>): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  const errors = { noPasswordMatch: true };

  if (password !== confirmPassword) {
    control.get('confirmPassword')?.setErrors(errors);
    return errors;
  }
  return null;
}
