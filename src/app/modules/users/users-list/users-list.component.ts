/* eslint-disable @typescript-eslint/no-explicit-any */
import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {ApiService} from '@data/services/api.service';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'lastLogin', 'status', 'joinedDate'];
  dataSource!: Observable<any>;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataSource = this.api.get(environment.users + '/GetByFilters?pageNumber=1&pageSize=10');
  }
}
