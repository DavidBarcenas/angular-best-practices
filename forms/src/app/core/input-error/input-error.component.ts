import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { ValidationErrors } from '@angular/forms';
import { ErrorMessagePipe } from './error-message.pipe';

@Component({
  selector: 'app-input-error',
  standalone: true,
  template: `
    <div *ngFor="let error of errors | keyvalue; trackBy: trackByFn" class="error-message">
      {{ error.key | errorMessage : error.value }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ErrorMessagePipe],
})
export class InputErrorComponent {
  @Input()
  errors: ValidationErrors | null | undefined = null;

  protected trackByFn(index: number, item: KeyValue<string, any>): string {
    return item.key;
  }
}
