import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../shared/utils/validators';
import { faEye, faEyeSlash, faPen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RequestStatus } from '../../../../models/request-status';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  protected readonly faPen = faPen;
  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faEye = faEye;

  formValidateEmail = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]]
  });

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
  status: RequestStatus = 'idle';
  statusValidateEmail: RequestStatus = 'idle';

  register() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.status = 'loading';
      const { name, email, password } = this.form.getRawValue();
      this.authService
        .register(name, email, password)
        .pipe(switchMap(() => this.authService.login(email, password)))
        .subscribe({
          next: () => {
            this.status = 'success';
            this.router.navigate(['/trello-clone/dashboard']);
          },
          error: () => (this.status = 'error')
        });
    }
  }

  validateEmail() {
    this.formValidateEmail.markAllAsTouched();
    if (this.formValidateEmail.valid) {
      this.statusValidateEmail = 'loading';
      const { email } = this.formValidateEmail.getRawValue();
      this.authService.isAvailable(email).subscribe({
        next: ({ isAvailable }) => {
          if (isAvailable) {
            this.statusValidateEmail = 'success';
            this.form.get('email')?.setValue(email);
          } else {
            this.statusValidateEmail = 'error';
            this.router.navigate(['/trello-clone/login'], { queryParams: { email } });
          }
        }
      });
    }
  }
}
