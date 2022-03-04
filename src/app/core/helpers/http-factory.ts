import {Observable, map} from 'rxjs';

import {ApiResponse} from '@data/interfaces/api-response.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';

export class HTTPFactory {
  constructor(private readonly endpoint: string, public http: HttpClient) {}

  getAll<T>(): Observable<T[]> {
    return this.http
      .get<ApiResponse<T[]>>(environment.api + this.endpoint)
      .pipe(map(({succeeded, data}) => (!succeeded ? [] : data)));
  }
}
