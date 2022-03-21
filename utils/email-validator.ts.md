# Email Validator

```js
// validators.ts

import {AbstractControl, ValidationErrors} from '@angular/forms';

export function ValidateEmail(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const emailIsValid = emailRegex.test(control.value);
  return emailIsValid ? null : { invalidEmail: 'The email is invalid' };
}
```
```js
// login.ts

import { ValidateEmail } from './validators';

form = this.fb.group({
  email: [null, [Validators.required, ValidateEmail]],
  password: [null, [Validators.required]],
});
```

```html
<!-- login.html -->

<form [formGroup]="form">
  <input type="email" formControlName="email" />
  <span *ngIf="form.get('email')?.errors?.invalidEmail && form.get('email')?.touched">El correo es inválido</span >

  <input type="password" formControlName="password" />
  <span *ngIf="form.get('password')?.errors?.required && form.get('password')?.touched">El correo es inválido</span >
  <button>Submit</button>
</form>
```