import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { UserSearchComponent } from '../user-search/user-search.component';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, UserSearchComponent, UserComponent],
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent {
  private userService = inject(UserService);
  users: User[] = [];
}
