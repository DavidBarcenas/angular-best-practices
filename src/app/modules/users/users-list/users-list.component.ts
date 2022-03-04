import {Component, OnInit} from '@angular/core';

import {GridColumns} from '@shared/interfaces/grid.interface';
import {Observable} from 'rxjs';
import {User} from '@data/interfaces/user.interface';
import {UsersService} from '../services/users.service';
import {environment} from '@env/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [UsersService],
})
export class UsersListComponent implements OnInit {
  dataSource!: Observable<User[]>;
  columns: GridColumns[] = [
    {name: 'nombre', key: 'name'},
    {name: 'correo', key: 'email'},
    {name: 'rol', key: ['role', 'name']},
    {name: 'estatus', key: 'status'},
    {name: 'fecha ingreso', key: 'dateCreated'},
    {name: 'actions', key: ''},
  ];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.dataSource = this.userService.getAll(environment.users + '?PageNumber=1&PageSize=10');
  }
}
