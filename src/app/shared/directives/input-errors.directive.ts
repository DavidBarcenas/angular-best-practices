/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, Host, Inject, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { EMPTY, merge, Observable } from 'rxjs';
import { FORM_ERRORS } from '../utils/messages';
import { FormSubmitDirective } from './form-submit.directive';

@Directive({
  selector: '[formControl], [formControlName]',
})
export class InputErrorsDirective {
  submit$: Observable<Event>;

  constructor(
    @Self() private control: NgControl,
    @Optional() @Host() private form: FormSubmitDirective,
    @Inject(FORM_ERRORS) private errors: any,
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    merge(this.submit$) // add this.control.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const controlErrors = this.control.errors;
        if (controlErrors) {
          const firstKey = Object.keys(controlErrors)[0];
          const getError = this.errors[firstKey];
          const text = getError(controlErrors[firstKey]);
        }
      });
  }
}
