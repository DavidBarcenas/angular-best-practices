import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
  private fb = inject(FormBuilder);
  phoneLabels = ['Home', 'Work', 'Mobile', 'Main'];
  form = this.fb.group({
    firstName: '',
    lastName: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    yearOfBirth: '',
    passport: '',
    address: this.fb.group({
      fullAddress: '',
      city: '',
      postCode: 0,
    }),
    hobbies: this.fb.array(['']),
    phones: this.fb.array([
      this.fb.group({
        label: this.phoneLabels[0],
        phone: '',
      }),
    ]),
  });

  addPhone(): void {
    this.form.controls.phones.push(
      this.fb.group({
        label: this.phoneLabels[0],
        phone: '',
      })
    );
  }

  removePhone(index: number): void {
    this.form.controls.phones.removeAt(index);
  }

  addHobbies(): void {
    this.form.controls.hobbies.push(this.fb.control(''));
  }

  removeHobbies(index: number): void {
    this.form.controls.hobbies.removeAt(index);
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }
}
