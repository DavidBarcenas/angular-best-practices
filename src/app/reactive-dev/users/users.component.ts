import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'username', 'cart'];
  usersWithCart$ = this.userService.usersWithCart$;

  constructor(private userService: UserService) {}
}
