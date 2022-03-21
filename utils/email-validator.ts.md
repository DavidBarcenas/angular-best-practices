# Email Validator

### validators.ts
```js
import {AbstractControl, ValidationErrors} from '@angular/forms';

export function ValidateEmail(control: AbstractControl): ValidationErrors | null {
  const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const emailIsValid = emailRegex.test(control.value);
  return emailIsValid ? null : { invalidEmail: 'The email is invalid' };
}
```

### login.ts
```js
import { ValidateEmail } from './validators';

form = this.fb.group({
  email: [null, [Validators.required, ValidateEmail]],
  password: [null, [Validators.required]],
});
```

### login.html
```html
<form [formGroup]="form">
  <input type="email" formControlName="email" />
  <span *ngIf="form.get('email')?.errors?.invalidEmail && form.get('email')?.touched">El correo es inválido</span>

  <input type="password" formControlName="password" />
  <span *ngIf="form.get('password')?.errors?.required && form.get('password')?.touched">El campo es requerido</span>

  <button>Acceder</button>
</form>
```