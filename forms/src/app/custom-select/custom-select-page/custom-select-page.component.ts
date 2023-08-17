import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSelectComponent, SelectValue } from '../custom-select/custom-select.component';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { User } from '../../core/user';

@Component({
  selector: 'app-custom-select-page',
  standalone: true,
  imports: [CommonModule, CustomSelectComponent, SelectOptionComponent],
  templateUrl: './custom-select-page.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectPageComponent {
  selectedValue: SelectValue<User> = [
    new User(2, 'Niels Bohr', 'niels', 'Denmark'),
    new User(3, 'Marie Curie', 'marie', 'Poland/French'),
  ];
  users: User[] = [
    new User(1, 'Albert Einstein', 'albert', 'Germany/USA'),
    new User(2, 'Niels Bohr', 'niels', 'Denmark'),
    new User(3, 'Marie Curie', 'marie', 'Poland/French'),
    new User(4, 'Isaac Newton', 'isaac', 'United Kingdom'),
    new User(5, 'Stephen Hawking', 'stephen', 'United Kingdom', true),
    new User(6, 'Max Planck', 'max', 'Germany'),
    new User(7, 'James Clerk Maxwell', 'james', 'United Kingdom'),
    new User(8, 'Michael Faraday', 'michael', 'United Kingdom'),
    new User(9, 'Richard Feynman', 'richard', 'USA'),
    new User(10, 'Ernest Rutherford', 'ernest', 'New Zealand'),
  ];

  displayWithFn(user: User) {
    return user.name;
  }

  compareWithFn(user1: User | null, user2: User | null) {
    return user1?.id === user2?.id;
  }

  onSelectionChange(value: SelectValue<User>) {
    console.log(value);
  }
}
