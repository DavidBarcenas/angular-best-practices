import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserComponent],
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent {
  private userService = inject(UserService);
  users: User[] = [];

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
  }

  delete(user: User): void {
    console.log(user);
  }
}
