import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '~/environments/environment';
import { handleError } from './handle-error';

interface Body<T> {
  body: T;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  request<T>(method: string, endpoint: string, body?: Body<T>): Observable<T> {
    const apiUrl = environment.apiUrl + endpoint;
    return this.http
      .request<T>(method, apiUrl, { body })
      .pipe(catchError(error => handleError(error)));
  }
}
