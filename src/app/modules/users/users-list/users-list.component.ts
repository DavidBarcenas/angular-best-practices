/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, OnInit} from '@angular/core';

import {ApiService} from '@data/services/api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  columns = [
    {name: 'apellido materno', key: 'firstName'},
    {name: 'apellido paterno', key: 'lastName'},
    {name: 'nombre', key: 'name'},
    {name: 'correo', key: 'email'},
    {name: 'rol', key: 'role'},
    {name: 'estatus', key: 'status'},
    {name: 'fecha ingreso', key: 'joinedDate'},
    {name: 'acciones', key: 'actions'},
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {}
}
