/* eslint-disable @typescript-eslint/no-explicit-any */
import {Component, OnInit} from '@angular/core';

import {ApiService} from '@data/services/api.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'name',
    'email',
    'role',
    'status',
    'joinedDate',
    'actions',
  ];
  dataSource!: Observable<any>;

  constructor(private api: ApiService) {}

  ngOnInit(): void {}
}
