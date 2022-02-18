import {Component, OnInit} from '@angular/core';

import {ApiService} from '@data/services/api.service';
import {environment} from '@env/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'rol',
    'status',
    'joined date',
  ];
  dataSource = [
    {
      name: 'Emma Smith',
      status: 'active',
      email: 'smith@kpmg.com',
      rol: 'Administrator',
      joinedDate: '21 Feb 2022, 9:23 pm',
    },
    {
      name: 'Emma Smith',
      status: 'active',
      email: 'smith@kpmg.com',
      rol: 'Administrator',
      joinedDate: '21 Feb 2022, 9:23 pm',
    },
    {
      name: 'Emma Smith',
      status: 'active',
      email: 'smith@kpmg.com',
      rol: 'Administrator',
      joinedDate: '21 Feb 2022, 9:23 pm',
    },
    {
      name: 'Emma Smith',
      status: 'active',
      email: 'smith@kpmg.com',
      rol: 'Administrator',
      joinedDate: '21 Feb 2022, 9:23 pm',
    },
    {
      name: 'Emma Smith',
      status: 'active',
      email: 'smith@kpmg.com',
      rol: 'Administrator',
      joinedDate: '21 Feb 2022, 9:23 pm',
    },
    {
      name: 'Emma Smith',
      status: 'active',
      email: 'smith@kpmg.com',
      rol: 'Administrator',
      joinedDate: '21 Feb 2022, 9:23 pm',
    },
    {
      name: 'Emma Smith',
      status: 'active',
      email: 'smith@kpmg.com',
      rol: 'Administrator',
      joinedDate: '21 Feb 2022, 9:23 pm',
    },
    {
      name: 'Emma Smith',
      status: 'active',
      email: 'smith@kpmg.com',
      rol: 'Administrator',
      joinedDate: '21 Feb 2022, 9:23 pm',
    },
    {
      name: 'Emma Smith',
      status: 'active',
      email: 'smith@kpmg.com',
      rol: 'Administrator',
      joinedDate: '21 Feb 2022, 9:23 pm',
    },
    {
      name: 'Emma Smith',
      status: 'active',
      email: 'smith@kpmg.com',
      rol: 'Administrator',
      joinedDate: '21 Feb 2022, 9:23 pm',
    },
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get(environment.users + '/GetByFilters?pageNumber=1&pageSize=10');
  }
}
