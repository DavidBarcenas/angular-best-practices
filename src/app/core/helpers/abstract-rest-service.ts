import {Observable, map} from 'rxjs';

import {ApiResponse} from '@data/interfaces/api-response.interface';
import {AppInjector} from './app-injector';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';

export abstract class AbstractRestService {
  private http: HttpClient;
  constructor(private endpoint: string) {
    const injector = AppInjector.getInjector();
    this.http = injector.get(HttpClient);
  }

  getAll<T>(): Observable<T[]> {
    return this.http
      .get<ApiResponse<T[]>>(environment.api + this.endpoint)
      .pipe(map(({succeeded, data}) => (!succeeded ? [] : data)));
  }
}
