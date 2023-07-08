import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../core/user-info';
import { BanWordsDirective } from './validators/ban-words.directive';
import { PasswordMatchDirective } from './validators/password-match.directive';
import { ToggleBanWordsPipe } from './pipes/toggle-ban-words.pipe';
import { UniqueNicknameDirective } from './validators/unique-nickname.directive';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    BanWordsDirective,
    PasswordMatchDirective,
    ToggleBanWordsPipe,
    UniqueNicknameDirective,
  ],
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
})
export class TemplateFormsPageComponent {
  @ViewChild(NgForm)
  ngForm: NgForm | undefined;

  userInfo: UserInfo = {
    city: '',
    email: '',
    firstName: '',
    fullAddress: '',
    lastName: '',
    nickname: '',
    passport: 0,
    postCode: 0,
    yearOfBirth: 0,
    password: '',
    confirmPassword: '',
  };

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
    console.log('onSubmit', form.value);
    // Strategy 1 - Reset form values, validation statuses, making controls untouched, pristine, etc.
    this.ngForm?.resetForm();
  }

  onReset(e: Event) {
    e.preventDefault();
    this.ngForm?.resetForm();
  }
}
