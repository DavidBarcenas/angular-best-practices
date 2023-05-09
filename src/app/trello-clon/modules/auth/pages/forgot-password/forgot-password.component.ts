import { Component, inject } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BtnComponent } from '../../../../shared/components/btn/btn.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FontAwesomeModule, BtnComponent, RouterLink]
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
