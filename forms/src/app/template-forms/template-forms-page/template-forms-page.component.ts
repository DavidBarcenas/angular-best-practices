import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../core/user-info';
import { BanWordsDirective } from './validators/ban-words.directive';
import { PasswordMatchDirective } from './validators/password-match.directive';
import { ToggleBanWordsPipe } from './pipes/toggle-ban-words.pipe';
import { UniqueNicknameDirective } from './validators/unique-nickname.directive';
import { HttpClientModule } from '@angular/common/http';
import { DynamicInputErrorDirective } from 'src/app/core/dynamic-input-error.directive';
import { ValidatorMessageContainer } from 'src/app/core/input-error/validator-message-container.directive';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  templateUrl: './template-forms-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .ng-valid.ng-dirty:not([ngModelGroup]):not(form) {
        border: 1px solid green;
      }

      .ng-invalid.ng-dirty:not([ngModelGroup]):not(form) {
        border: 1px solid red;
      }

      button[disabled] {
        background: rgba(0, 0, 0, 0.15);
        border-color: rgba(0, 0, 0, 0.1);
        pointer-events: none;
      }
    `,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BanWordsDirective,
    PasswordMatchDirective,
    ToggleBanWordsPipe,
    UniqueNicknameDirective,
    DynamicInputErrorDirective,
    ValidatorMessageContainer,
  ],
})
export class TemplateFormsPageComponent implements AfterViewInit {
  @ViewChild(NgForm)
  ngForm: NgForm | undefined;

  userInfo: UserInfo = {
    city: '',
    email: '',
    firstName: 'Davee',
    fullAddress: '',
    lastName: '',
    nickname: '',
    passport: 0,
    postCode: 0,
    yearOfBirth: 0,
    password: '',
    confirmPassword: '',
  };

  private initialFormValues: unknown;

  ngAfterViewInit() {
    queueMicrotask(() => {
      this.initialFormValues = this.ngForm?.value;
    });
  }

  get isAdult() {
    const currentYear = new Date().getUTCFullYear();
    return currentYear - this.userInfo.yearOfBirth >= 18;
  }

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log('onSubmit', form.value);
    // Strategy 1 - Reset form values, validation statuses, making controls untouched, pristine, etc.
    //this.ngForm?.resetForm();
    // Strategy 2 - Reset only control statuses but not values
    this.ngForm?.resetForm(this.ngForm?.value);
    this.initialFormValues = this.ngForm?.value;
  }

  onReset(e: Event) {
    e.preventDefault();
    this.ngForm?.resetForm(this.initialFormValues);
  }
}
