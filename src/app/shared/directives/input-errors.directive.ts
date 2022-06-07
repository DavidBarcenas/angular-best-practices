import { Directive, Inject, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { FORM_ERRORS } from '../utils/messages';

@Directive({
  selector: '[formControl], [formControlName]',
})
export class InputErrorsDirective {
  constructor(
    @Self() private control: NgControl,
    @Inject(FORM_ERRORS) private errors: any,
  ) {}

  ngOnInit() {
    this.control.valueChanges?.pipe(untilDestroyed(this)).subscribe(() => {
      const controlErrors = this.control.errors;
    });
  }
}
