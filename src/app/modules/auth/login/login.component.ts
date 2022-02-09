import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {formErrors} from '@data/constants/form-errors';
import {ValidateEmail} from '@utils/validators';
import {ApiService} from '@data/services/api.service';
import {Auth, GetToken, GetTokenResponse} from '@data/models/auth.model';
import {environment} from '@env/environment';

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
    const payload = Auth.getToken(this.form.value.email);
    this.api
      .post<GetTokenResponse, GetToken>(environment.getToken, payload)
      .subscribe(res => console.log(res));
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }
}
