import {Observable, map} from 'rxjs';

import {AppInjector} from './app-injector';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env/environment';

interface ApiResponse<T> extends ApiPagination {
  succeeded: boolean;
  message: string;
  errors: null;
  data: T;
}

interface ApiPagination {
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  totalItems?: number;
}

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
