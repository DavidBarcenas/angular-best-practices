import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '~/environments/environment';

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
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError(error: HttpErrorResponse) {
    const clientSide = 0;
    if (error.status === clientSide) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      );
    }

    return throwError(() => 'Something bad happened; please try again later.');
  }
}
