import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ERROR_MESSAGES } from '../../utils/input-errors';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent implements OnInit {
  @Input() field!: string;
  @Input() errors!: { [idx: string]: string };
  formContainer!: FormGroupDirective;
  error: string | null = '';

  constructor(@Optional() @Host() private reactiveForm: FormGroupDirective) {
    this.formContainer = this.reactiveForm;

    if (!this.formContainer) {
      throw new Error(
        'input-error must be used with a parent formGroup directive',
      );
    }
  }

  ngOnInit(): void {
    this.formContainer.ngSubmit.subscribe(() => {
      this.error = this.getErrors();
    });
  }

  getErrors(): string | null {
    const control = this.formContainer.form.controls[this.field];
    let firstError: string | null = null;

    if (control && this.formContainer.submitted) {
      const defaultErrors = this.errors || ERROR_MESSAGES;
      Object.keys(defaultErrors).some(error => {
        if (control.hasError(error)) {
          firstError = defaultErrors[error];
          return true;
        }
        return false;
      });
    }
    return firstError;
  }
}
