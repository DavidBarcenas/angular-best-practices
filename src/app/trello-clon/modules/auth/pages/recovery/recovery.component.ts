import { Component, inject } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../shared/utils/validators';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html'
})
export class RecoveryComponent {
  private fb: FormBuilder = inject(FormBuilder);

  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faEye = faEye;

  showPassword = false;
  status = 'idle';

  form = this.fb.nonNullable.group(
    {
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },
    {
      validators: [CustomValidators.MatchValidator('newPassword', 'confirmPassword')]
    }
  );

  recovery() {
    console.log(this.form.valid);
    console.log(this.form.errors);
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // TODO
    }
  }
}
