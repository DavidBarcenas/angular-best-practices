import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {environment} from '@env/environment';
import {handleError} from '@utils/handle-error';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http
      .post<T>(environment.apiUrl + endpoint, body)
      .pipe(catchError(error => handleError(error)));
  }
}
