import {Component, OnInit} from '@angular/core';
import {Observable, map} from 'rxjs';

import {GridColumns} from '@shared/interfaces/grid.interface';
import {User} from '@core/models/user.model';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UsersService],
})
export class UsersListComponent implements OnInit {
  users$!: Observable<User[]>;
  columns: GridColumns[] = [
    {name: 'nombre', key: 'name'},
    {name: 'correo', key: 'email'},
    {name: 'rol', key: ['role', 'name']},
    {name: 'estatus', key: 'status'},
    {name: 'fecha ingreso', key: 'dateCreated'},
    {name: 'acciones', key: ''},
  ];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.userService.getAll<User>().pipe(map(users => this.transformName(users)));
  }

  transformName(users: User[]): User[] {
    const modifiedUsers = users.map(user => {
      return {
        ...user,
        name: `${user.secondLastName} ${user.lastName} ${user.name}`,
      };
    });
    return modifiedUsers;
  }
}
