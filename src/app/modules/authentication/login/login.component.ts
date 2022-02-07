import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@data/services/auth.service';
import { formErrors } from '@data/constants/form-errors';
import { ValidateEmail } from '@utils/validators/email';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    email: [null, [Validators.required, ValidateEmail]],
    password: [null, [Validators.required]],
  });
  errors = formErrors;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid === true) {
      return;
    }

    this.auth.isLoggedIn = true;
    this.router.navigate(['/dashboard']);
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }
}
