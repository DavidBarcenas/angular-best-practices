import {Observable, map} from 'rxjs';

import {ApiResponse} from '@data/interfaces/api-response.interface';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  get<T>(endpoint: string): Observable<T | T[] | null> {
    return this.http.get<ApiResponse<T>>(environment.api + endpoint).pipe(
      map(({data, succeeded}) => {
        if (!succeeded) {
          if (data instanceof Array) {
            return [];
          }
        }
        return data;
      }),
    );
  }

  post<T, K>(endpoint: string, body: K): Observable<T> {
    return this.http.post<T>(environment.apiUrl + endpoint, body);
  }
}
