import {Component, Host, Input, Optional} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';
import {ERROR_MESSAGES} from '@data/constants/error-messages';

@Component({
  selector: 'app-field-errors',
  templateUrl: './field-errors.component.html',
  styleUrls: ['./field-errors.component.scss'],
})
export class FieldErrorsComponent {
  @Input() field!: string;
  form: FormGroupDirective;

  constructor(@Optional() @Host() private reactiveForm: FormGroupDirective) {
    this.form = this.reactiveForm;

    if (!this.form) {
      throw new Error('control-errors must be used with a parent formGroup directive');
    }
  }

  get error(): string | null {
    const control = this.form.form.controls[this.field];
    let firstError = null;

    if (control && this.form.submitted) {
      Object.keys(ERROR_MESSAGES).some(error => {
        if (control.hasError(error)) {
          firstError = ERROR_MESSAGES[error];
          return true;
        }
        return false;
      });
    }
    return firstError;
  }
}
