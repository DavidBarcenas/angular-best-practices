import {Observable, map} from 'rxjs';

import {ApiResponse} from '@data/interfaces/api-response.interface';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '@data/models/user.model';
import {environment} from '@env/environment';

@Injectable()
export class UsersService {
  constructor(private readonly http: HttpClient) {}

  getAll(endpoint: string): Observable<User[]> {
    return this.http
      .get<ApiResponse<User[]>>(environment.api + endpoint)
      .pipe(map(({succeeded, data}) => (!succeeded ? [] : data)));
  }
}
