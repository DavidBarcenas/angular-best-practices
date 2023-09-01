import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroupDirective, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ButtonComponent } from '../../core/button/button.component';
import { SkillsService } from '../../core/skills.service';
import { bufferCount, filter, startWith, tap } from 'rxjs';
import { banWord } from '../validators/ban-word.validator';
import { passwordMatch } from '../validators/password-match.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UniqueNicknameValidator } from '../validators/unique-nickname-validator';
import { DynamicInputErrorDirective } from 'src/app/core/dynamic-input-error.directive';
import { sharedDynamicControlDeps } from 'src/app/dynamic-forms/dynamic-controls/base-dynamic-control';
import { ErrorStateMatcher, OnTouchedErrorStateMatcher } from 'src/app/core/input-error/error-state-matcher.service';

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [...sharedDynamicControlDeps, ButtonComponent, DynamicInputErrorDirective],
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

      .ng-invalid.ng-touched:not([formGroupName]):not([formArrayName]):not(form) {
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
  private cd = inject(ChangeDetectorRef);
  private skillsService = inject(SkillsService);
  private destroyRef = inject(DestroyRef);
  private uniqueNickname = inject(UniqueNicknameValidator);

  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective | undefined;
  skills$ = this.skillsService.skills$.pipe(tap((skills) => this.buildSkills(skills)));

  phoneLabels = ['Home', 'Work', 'Mobile', 'Main'];
  bannedWords = ['test', 'anonymous', 'dummy'];
  years = this.getYears();
  showErrorStrategy = new OnTouchedErrorStateMatcher();

  form = this.fb.group({
    firstName: ['Dave', [Validators.required, Validators.minLength(2), banWord(this.bannedWords)]],
    lastName: ['Pro', [Validators.required, Validators.minLength(2), banWord(this.bannedWords)]],
    nickname: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(/^[\w.]+$/),
          banWord(this.bannedWords),
        ],
        asyncValidators: [this.uniqueNickname.validate.bind(this.uniqueNickname)],
        updateOn: 'blur',
      },
    ],
    email: ['dave@mail.com', Validators.email],
    yearOfBirth: [this.years[30], Validators.required],
    passport: ['', [Validators.pattern(/^[A-Z]{2}\d{4}$/)]],
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
    this.addDynamicPassportValidation();
    this.checkPendingFormStatus();
  }

  checkPendingFormStatus(): void {
    this.form.statusChanges
      .pipe(
        bufferCount(2, 1),
        filter(([prevStatus]) => prevStatus === 'PENDING'),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.cd.markForCheck());
  }

  addDynamicPassportValidation(): void {
    const birthYearCtrl = this.form.get('yearOfBirth');
    const passportCtrl = this.form.get('passport');

    birthYearCtrl?.valueChanges
      .pipe(
        tap(() => passportCtrl?.markAsDirty()),
        startWith(birthYearCtrl?.value),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((year) => {
        this.isAdult(year ?? 0)
          ? passportCtrl?.addValidators(Validators.required)
          : passportCtrl?.removeValidators(Validators.required);
        passportCtrl?.updateValueAndValidity();
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
    // this.formDirective?.resetForm(this.form.getRawValue()); Mantiene los datos después del submit
    this.formDirective?.resetForm();
  }

  onReset(e: Event): void {
    e.preventDefault();
    this.form.reset();
  }

  private getYears(): number[] {
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
