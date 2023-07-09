import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../core/button/button.component';

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './reactive-forms-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .form-label {
        @apply block text-sm font-medium text-gray-700;
      }

      .form-input {
        @apply mt-1 w-full rounded-md border border-gray-400 bg-white text-sm text-gray-700 shadow-sm py-2 px-3;
      }
    `,
  ],
})
export class ReactiveFormsPageComponent {
  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }
}
