/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, OnInit} from '@angular/core';

import {ApiService} from '@data/services/api.service';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  columns = [
    {name: 'apellido materno', key: 'secondLastName'},
    {name: 'apellido paterno', key: 'lastName'},
    {name: 'nombre', key: 'name'},
    {name: 'correo', key: 'email'},
    {name: 'rol', key: 'role.name'},
    {name: 'estatus', key: 'status'},
    {name: 'fecha ingreso', key: 'dateCreated'},
    {name: 'acciones', key: ''},
  ];
  data!: Observable<any>;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    // this.data = this.api.get(environment.users + '?PageNumber=1&PageSize=10');
  }
}
