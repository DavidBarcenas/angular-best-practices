import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {formErrors} from '@data/constants/form-errors';
import {ValidateEmail} from '@utils/validators';
import {ApiService} from '@data/services/api.service';

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
  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {}

  handleSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }
}
