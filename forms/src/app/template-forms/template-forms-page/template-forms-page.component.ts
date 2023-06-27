import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserInfo } from '../../core/user-info';

@Component({
  selector: 'app-template-forms-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './template-forms-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFormsPageComponent {
  userInfo: UserInfo = {
    city: '',
    email: '',
    firstName: '',
    fullAddress: '',
    lastName: '',
    nickname: '',
    password: '',
    postCode: 0,
    yearOfBirth: 0,
  };

  get years() {
    const now = new Date().getUTCFullYear();
    return Array(now - (now - 40))
      .fill('')
      .map((_, idx) => now - idx);
  }
}
