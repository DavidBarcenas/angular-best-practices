import { Component, Host, Input, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent {
  @Input() field!: string;
  @Input() errors!: { [idx: string]: string };
  formContainer!: FormGroupDirective;

  constructor(@Optional() @Host() private reactiveForm: FormGroupDirective) {
    this.formContainer = this.reactiveForm;

    if (!this.formContainer) {
      throw new Error(
        'input-error must be used with a parent formGroup directive',
      );
    }
  }

  get error(): string | null {
    const control = this.formContainer.form.controls[this.field];
    let firstError: string | null = null;

    if (this.errors) {
      Object.keys(this.errors).some(error => {
        if (control.hasError(error)) {
          firstError = this.errors[error];
          return true;
        }
        return false;
      });
    }

    return firstError;
  }
}
