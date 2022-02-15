import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {ValidateEmail} from '@utils/validators';
import {AuthService} from '@data/services/auth.service';
import {GetToken} from '@data/models/auth.model';
import {ErrorMessages} from '@data/constants/error-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.fb.group({
    email: [null, [Validators.required, ValidateEmail]],
    password: [null, [Validators.required]],
  });
  errorMessages = ErrorMessages;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  handleSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    const payload = new GetToken(this.form.value.email);
    this.authService.login(payload).subscribe(res => {
      console.log('response', res);
      if (res.token) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  get unauthorizedUser() {
    return this.authService.invalidCredentials;
  }
}
