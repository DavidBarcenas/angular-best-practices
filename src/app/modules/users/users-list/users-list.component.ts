/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, OnInit} from '@angular/core';

import {ApiService} from '@data/services/api.service';
import {GridColumns} from '@shared/interfaces/grid.interface';
import {Observable} from 'rxjs';
import {User} from '@data/interfaces/user.interface';
import {environment} from '@env/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  dataSource!: Observable<any>;
  columns: GridColumns[] = [
    {name: 'nombre', key: 'name'},
    {name: 'correo', key: 'email'},
    {name: 'rol', key: ['role', 'name']},
    {name: 'estatus', key: 'status'},
    {name: 'fecha ingreso', key: 'dateCreated'},
    {name: 'actions', key: ''},
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .get<User[]>(environment.users + '?PageNumber=1&PageSize=10')
      .subscribe(res => console.log(res));
  }
}
