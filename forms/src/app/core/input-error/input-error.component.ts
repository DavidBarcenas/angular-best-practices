import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { VALIDATION_ERROR_MESSAGES } from './input-error-messages.token';

@Component({
  selector: 'app-input-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngFor="let error of errors | keyvalue" class="error-message">
      {{ errorsMap[error.key](error.value) }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputErrorComponent {
  @Input()
  errors: ValidationErrors | null | undefined = null;

  protected errorsMap = inject(VALIDATION_ERROR_MESSAGES);
}
