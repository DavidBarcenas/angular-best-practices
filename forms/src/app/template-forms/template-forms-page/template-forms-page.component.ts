import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../core/user-info';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  };

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }

  onSubmit(form: NgForm) {
    console.log('onSubmit', form.value);
  }
}
