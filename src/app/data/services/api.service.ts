import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  get(endpoint: string) {
    return this.http.get(environment.api + endpoint);
  }

  post<T, K>(endpoint: string, body: K): Observable<T> {
    return this.http.post<T>(environment.apiUrl + endpoint, body);
  }
}
