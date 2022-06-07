import { InjectionToken } from '@angular/core';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const defaultErrors: Record<string, (args: any) => string> = {
  required: () => 'This field is required',
  email: () => 'This field must be a valid email address',
  minlength: ({ requiredLength, actualLength }) =>
    `Expect ${requiredLength} but got ${actualLength}`,
  // maxlength: 'This field must be at most :placeholder characters',
  // pattern: 'This field must match the pattern :placeholder',
  // min: 'This field must be at least :placeholder',
  // max: 'This field must be at most :placeholder',
  // minDate: 'This field must be at least :placeholder',
  // maxDate: 'This field must be at most :placeholder',
  // minTime: 'This field must be at least :placeholder',
  // maxTime: 'This field must be at most :placeholder',
  // minItems: 'This field must contain at least :placeholder items',
  // maxItems: 'This field must contain at most :placeholder items',
  // uniqueItems: 'This field must contain unique items',
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors,
});
