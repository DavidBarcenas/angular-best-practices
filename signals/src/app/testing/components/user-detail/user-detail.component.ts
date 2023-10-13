import { Component, inject, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-detail.component.html',
  styles: [],
})
export class UserDetailComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private location = inject(Location);

  @Input() user: User | undefined;

  getHero() {
    const id = this.route.snapshot.paramMap.get('id');
  }

  goBack(): void {
    this.location.back();
  }
}
