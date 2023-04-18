import { Component, inject } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  private fb: FormBuilder = inject(FormBuilder);
  protected readonly faPen = faPen;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]]
  });

  status = 'idle';
  emailSent = false;

  sendLink() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.status = 'loading';
      this.emailSent = true;
      const { email } = this.form.getRawValue();
    }
  }
}
