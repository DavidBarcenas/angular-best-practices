import { Component, inject } from '@angular/core';
import { faEye, faEyeSlash, faPen, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus } from '../../../../models/request-status';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  protected readonly faPen = faPen;
  protected readonly faEye = faEye;
  protected readonly faEyeSlash = faEyeSlash;
  protected readonly faSpinner = faSpinner;

  showPassword = false;
  status: RequestStatus = 'idle';

  form = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor() {
    this.activatedRoute.queryParamMap.subscribe({
      next: params => {
        const email = params.get('email');
        if (email) {
          this.form.get('email')?.setValue(email);
        }
      }
    });
  }

  login() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.status = 'loading';
      const { email, password } = this.form.getRawValue();
      this.authService.login(email, password).subscribe({
        next: () => {
          this.status = 'success';
          this.router.navigate(['/trello-clone/dashboard']);
        },
        error: () => {
          this.status = 'error';
        }
      });
    }
  }
}
