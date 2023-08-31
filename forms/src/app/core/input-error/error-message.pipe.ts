import { Pipe, PipeTransform, inject } from '@angular/core';
import { VALIDATION_ERROR_MESSAGES } from './input-error-messages.token';

@Pipe({
  name: 'errorMessage',
  standalone: true,
})
export class ErrorMessagePipe implements PipeTransform {
  private errorMessages = inject(VALIDATION_ERROR_MESSAGES);

  transform(errorKey: string, errorValue: any): string {
    if (!this.errorMessages[errorKey]) {
      console.warn(`Missing message for ${errorKey} validator`);
      return '';
    }
    return this.errorMessages[errorKey](errorValue);
  }
}
