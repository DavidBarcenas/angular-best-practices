import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../core/button/button.component';
import { SkillsService } from '../../core/skills.service';
import { tap } from 'rxjs';
import { banWord } from '../validators/ban-word.validator';

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
        @apply mt-1 w-full rounded-md outline outline-1 outline-gray-400 bg-white text-sm text-gray-700 shadow-sm py-2 px-3;
      }

      .ng-valid.ng-dirty:not([formGroupName]):not([formArrayName]):not(form) {
        @apply outline outline-1 outline-green-500;
      }

      .ng-invalid.ng-dirty:not([formGroupName]):not([formArrayName]):not(form) {
        @apply outline outline-1 outline-red-500;
      }

      .error-message {
        @apply text-red-500 text-xs px-2;
      }
    `,
  ],
})
export class ReactiveFormsPageComponent {
  private fb = inject(NonNullableFormBuilder);
  private skillsService = inject(SkillsService);
  skills$ = this.skillsService.skills$.pipe(tap((skills) => this.buildSkills(skills)));

  phoneLabels = ['Home', 'Work', 'Mobile', 'Main'];
  years = this.getYears();

  form = this.fb.group({
    firstName: ['Dave', [Validators.required, Validators.minLength(2), banWord(['test', 'anonymous', 'dummy'])]],
    lastName: ['Pro', [Validators.required, Validators.minLength(2)]],
    nickname: ['dave_.1', [Validators.required, Validators.minLength(2), Validators.pattern(/^[\w.]+$/)]],
    email: ['dave@mail.com', Validators.email],
    password: '',
    confirmPassword: '',
    yearOfBirth: [this.years[25], Validators.required],
    passport: ['DF1234', [Validators.pattern(/^[A-Z]{2}\d{4}$/)]],
    address: this.fb.group({
      fullAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: 0,
    }),
    hobbies: this.fb.array(['']),
    phones: this.fb.array([
      this.fb.group({
        label: this.phoneLabels[0],
        phone: '',
      }),
    ]),
    skills: this.fb.record<boolean>({}),
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

  onSubmit(): void {
    console.log(this.form.getRawValue());
  }

  private getYears() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }

  private buildSkills(skills: string[]): void {
    skills.forEach((skill) => {
      this.form.controls.skills.addControl(skill, this.fb.control(false));
    });
  }
}
