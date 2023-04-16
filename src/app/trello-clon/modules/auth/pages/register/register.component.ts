import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../shared/utils/validators';
import { faEye, faEyeSlash, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb: FormBuilder = inject(FormBuilder);

  form = this.fb.nonNullable.group(
    {
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      validators: [CustomValidators.MatchValidator('password', 'confirmPassword')]
    }
  );

  showPassword = false;
  status = 'idle';

  register() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      console.log(name, email, password);
    }
  }

  protected readonly faPen = faPen;
  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faEye = faEye;
}
