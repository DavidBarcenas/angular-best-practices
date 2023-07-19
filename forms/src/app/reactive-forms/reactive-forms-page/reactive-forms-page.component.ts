import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../core/button/button.component';
import { SkillsService } from '../../core/skills.service';
import { tap } from 'rxjs';

const fb = new FormBuilder();

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
  private skillsService = inject(SkillsService);
  skills$ = this.skillsService.skills$.pipe(tap((skills) => this.buildSkills(skills)));

  phoneLabels = ['Home', 'Work', 'Mobile', 'Main'];
  years = this.getYears();

  form = fb.nonNullable.group({
    firstName: [''],
    lastName: '',
    nickname: '',
    email: '',
    password: '',
    confirmPassword: '',
    yearOfBirth: '',
    passport: '',
    address: fb.group({
      fullAddress: '',
      city: '',
      postCode: 0,
    }),
    hobbies: fb.array(['']),
    phones: fb.array([
      fb.group({
        label: this.phoneLabels[0],
        phone: '',
      }),
    ]),
    skills: fb.group<{ [key: string]: FormControl<boolean> }>({}),
  });

  addPhone(): void {
    this.form.controls.phones.push(
      fb.group({
        label: this.phoneLabels[0],
        phone: '',
      })
    );
  }

  removePhone(index: number): void {
    this.form.controls.phones.removeAt(index);
  }

  addHobbies(): void {
    this.form.controls.hobbies.push(fb.control(''));
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
      this.form.controls.skills.addControl(skill, fb.control(false, { nonNullable: true }));
    });
  }
}
