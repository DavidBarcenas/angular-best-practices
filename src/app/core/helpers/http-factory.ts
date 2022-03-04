import {Observable, map} from 'rxjs';

import {ApiResponse} from '@data/interfaces/api-response.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';

export abstract class AbstractRestService {
  protected readonly endpoint!: string;
  protected constructor(private http: HttpClient) {}

  getAll<T>(): Observable<T[]> {
    return this.http
      .get<ApiResponse<T[]>>(environment.api + this.endpoint)
      .pipe(map(({succeeded, data}) => (!succeeded ? [] : data)));
  }
}
