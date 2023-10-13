import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styles: [],
})
export class UserComponent {
  @Input() user: User | undefined;
  @Output() delete = new EventEmitter();

  onDeleteClick($event: any): void {
    $event.stopPropagation();
    this.delete.next('');
  }
}
