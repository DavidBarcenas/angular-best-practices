import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../core/button/button.component';
import { SkillsService } from '../../core/skills.service';
import { tap } from 'rxjs';

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
        @apply mt-1 w-full rounded-md outline outline-gray-400 bg-white text-sm text-gray-700 shadow-sm py-2 px-3;
      }

      .ng-valid.ng-dirty:not([formGroupName]):not([formArrayName]):not(form) {
        @apply outline-2 outline-green-500;
      }

      .ng-invalid.ng-dirty:not([formGroupName]):not([formArrayName]):not(form) {
        @apply outline-2 outline-red-500;
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
    firstName: ['', [Validators.required, Validators.minLength(2)]],
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
