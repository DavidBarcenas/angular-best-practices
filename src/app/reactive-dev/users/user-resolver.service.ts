import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';
import { UserService } from './user.service';

@Injectable()
export class UserResolver implements Resolve<User[]> {
  constructor(private userService: UserService) {}

  resolve(): User[] | Observable<User[]> | Promise<User[]> {
    return this.userService.usersWithCart$;
  }
}
