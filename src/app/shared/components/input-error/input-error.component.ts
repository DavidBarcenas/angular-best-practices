import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

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
      if (this.errors) {
        Object.keys(this.errors).some(error => {
          if (control.hasError(error)) {
            firstError = this.errors[error];
            return true;
          }
          return false;
        });
      }
    }
    return firstError;
  }
}

/*
 const control = this.formContainer.form.get(this.field);
    const errors = control.errors;

    if (!control || !errors) {
      return null;
    }

    if (errors.required) {
      return 'This field is required';
    }

    if (errors.minlength) {
      return `This field must be at least ${errors.minlength.requiredLength} characters`;
    }

    if (errors.maxlength) {
      return `This field must be at most ${errors.maxlength.requiredLength} characters`;
    }

    if (errors.pattern) {
      return `This field must match the pattern ${errors.pattern.requiredPattern}`;
    }

    if (errors.min) {
      return `This field must be at least ${errors.min.min}`;
    }

    if (errors.max) {
      return `This field must be at most ${errors.max.max}`;
    }

    if (errors.email) {
      return 'This field must be a valid email address';
    }

    if (errors.minDate) {
      return `This field must be at least ${errors.minDate.minDate}`;
    }

    if (errors.maxDate) {
      return `This field must be at most ${errors.maxDate.maxDate}`;
    }

    if (errors.minTime) {
      return `This field must be at least ${errors.minTime.minTime}`;
    }

    if (errors.maxTime) {
      return `This field must be at most ${errors.maxTime.maxTime}`;
    }

    if (errors.minItems) {
      return `This field must contain at least ${errors.minItems.minItems} items`;
    }

    if (errors.maxItems) {
      return `This field must contain at most ${errors.maxItems.maxItems} items`;
    }

    if (errors.uniqueItems) {
      return `This field must contain unique items`;
    }

    if (errors.custom) {
      return errors.
  }  
*/
