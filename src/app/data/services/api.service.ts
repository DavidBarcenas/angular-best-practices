import {Observable, map} from 'rxjs';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  get(endpoint: string) {
    return this.http
      .get(environment.api + endpoint)
      .pipe(map((res: any) => (res.data.length > 0 ? res.data : [])));
  }

  post<T, K>(endpoint: string, body: K): Observable<T> {
    return this.http.post<T>(environment.apiUrl + endpoint, body);
  }
}
