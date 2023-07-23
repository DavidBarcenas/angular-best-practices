import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../core/button/button.component';
import { SkillsService } from '../../core/skills.service';
import { tap } from 'rxjs';
import { banWord } from '../validators/ban-word.validator';
import { passwordMatch } from '../validators/password-match.validator';

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
        @apply mt-1 mb-1 w-full rounded-md outline outline-1 outline-gray-400 bg-white text-sm text-gray-700 shadow-sm py-2 px-3;
      }

      .ng-valid.ng-dirty:not([formGroupName]):not([formArrayName]):not(form):not(.phones) {
        @apply outline outline-1 outline-green-500;
      }

      .ng-invalid.ng-dirty:not([formGroupName]):not([formArrayName]):not(form) {
        @apply outline outline-1 outline-red-500;
      }

      .error-message {
        @apply text-red-500 text-xs px-2 block animate-fade-message;
      }
    `,
  ],
})
export class ReactiveFormsPageComponent implements OnInit {
  private fb = inject(NonNullableFormBuilder);
  private skillsService = inject(SkillsService);
  skills$ = this.skillsService.skills$.pipe(tap((skills) => this.buildSkills(skills)));

  phoneLabels = ['Home', 'Work', 'Mobile', 'Main'];
  bannedWords = ['test', 'anonymous', 'dummy'];
  years = this.getYears();

  form = this.fb.group({
    firstName: ['Dave', [Validators.required, Validators.minLength(2), banWord(this.bannedWords)]],
    lastName: ['Pro', [Validators.required, Validators.minLength(2), banWord(this.bannedWords)]],
    nickname: [
      'dave_.1',
      [Validators.required, Validators.minLength(2), Validators.pattern(/^[\w.]+$/), banWord(this.bannedWords)],
    ],
    email: ['dave@mail.com', Validators.email],
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
    userPassword: this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      },
      { validators: passwordMatch }
    ),
  });

  ngOnInit(): void {
    this.form.get('yearOfBirth')?.valueChanges.subscribe((year) => {
      this.isAdult(year)
        ? this.form.get('passport')?.setValidators(Validators.required)
        : this.form.get('passport')?.removeValidators(Validators.required);
    });
  }

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

  private isAdult(yearOfBirth: number): boolean {
    return new Date().getUTCFullYear() - yearOfBirth >= 18;
  }
}
