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
  dataSource!: Observable<any>;
  displayedColumns: string[] = ['name', 'email', 'rol', 'status', 'joinedDate', 'actions'];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.dataSource = this.api.get(environment.users + '?PageNumber=1&PageSize=10');
  }
}
