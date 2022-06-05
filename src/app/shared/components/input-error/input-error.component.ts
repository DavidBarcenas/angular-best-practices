import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ERROR_MESSAGES } from '../../utils/messages';

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
    console.log('SE EJECUTA');
    const control = this.formContainer.form.controls[this.field];
    let firstError: string | null = null;

    if (control && this.formContainer.submitted) {
      const controlErrors = this.errors || ERROR_MESSAGES;
      Object.keys(controlErrors).some(error => {
        if (control.hasError(error)) {
          firstError = controlErrors[error];
          return true;
        }
        return false;
      });
    }
    return firstError;
  }
}
