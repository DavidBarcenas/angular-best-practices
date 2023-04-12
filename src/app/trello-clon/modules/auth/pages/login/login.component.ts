import { Component, inject } from '@angular/core';
import { faEye, faEyeSlash, faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);

  protected readonly faPen = faPen;
  protected readonly faEye = faEye;
  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faSpinner = faSpinner;

  showPassword = false;
  status = 'idle';

  form = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  login() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
    }
  }
}
