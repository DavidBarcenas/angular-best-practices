import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-search.component.html',
  styles: [],
})
export class UserSearchComponent implements OnInit {
  private userService = inject(UserService);
  private searchTerms = new Subject<string>();
  users$: Observable<User[]> | undefined;

  ngOnInit() {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUsers(term))
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
