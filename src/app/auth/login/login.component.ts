import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Regex } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(Regex.email)]],
      psswd: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      remember: [false],
    });
  }

  handleSubmit(): void {
    console.log(this.form.value);
  }
}
