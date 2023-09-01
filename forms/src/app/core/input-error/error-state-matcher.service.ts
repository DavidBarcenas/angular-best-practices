import { Injectable } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

export type ErrorStateControl = AbstractControl | null;
export type ErrorStateForm = NgForm | FormGroupDirective | null;

export interface ErrorStateMatcherImpl {
  hasError(control: ErrorStateControl, form: ErrorStateForm): boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorStateMatcher {
  hasError(control: ErrorStateControl, form: ErrorStateForm): boolean {
    const isInvalid = control && control.invalid;
    const isSubmitted = form && form.submitted;
    return Boolean(isInvalid && (control.dirty || isSubmitted));
  }
}

export class OnTouchedErrorStateMatcher {
  hasError(control: ErrorStateControl, form: ErrorStateForm): boolean {
    const isInvalid = control && control.invalid;
    const isSubmitted = form && form.submitted;
    return Boolean(isInvalid && (control.touched || isSubmitted));
  }
}
