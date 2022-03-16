import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, map} from 'rxjs';

import {AppInjector} from './app-injector';
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

const DEFAULT_ITEMS_PER_PAGE = 10;
const DEFAULT_CURRENT_PAGE = 1;

export abstract class AbstractRestService {
  private http: HttpClient;
  currentPage = DEFAULT_CURRENT_PAGE;

  constructor(private endpoint: string) {
    const injector = AppInjector.getInjector();
    this.http = injector.get(HttpClient);
  }

  getAll<T>(
    currentPage = DEFAULT_CURRENT_PAGE,
    itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  ): Observable<T[]> {
    let params = new HttpParams();
    if (currentPage) {
      params = params.append('pageNumber', currentPage);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http
      .get<ApiResponse<T[]>>(environment.api + this.endpoint, {params})
      .pipe(map(({succeeded, data}) => (!succeeded ? [] : data)));
  }
}
