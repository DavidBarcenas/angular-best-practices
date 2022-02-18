import {Component, OnInit} from '@angular/core';

import {ApiService} from '@data/services/api.service';
import {environment} from '@env/environment';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'lastname'];
  dataSource = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get(environment.users + '/GetByFilters?pageNumber=1&pageSize=10');
  }
}
