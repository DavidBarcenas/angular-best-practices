/* eslint-disable @typescript-eslint/no-explicit-any */
import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import {AuthService} from '@data/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  refreshTokenInProgress = false;
  accessTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          this.authService.isAuthenticated()
        ) {
          console.log('entra 401');
          if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.accessTokenSubject.next(null);
            return this.authService.refreshToken().pipe(
              switchMap(resp => {
                this.refreshTokenInProgress = false;
                this.accessTokenSubject.next(resp.token);
                req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${resp.token}`,
                  },
                });
                return next.handle(req);
              }),
              catchError((error: HttpErrorResponse) => {
                this.refreshTokenInProgress = false;
                this.authService.logout();
                return throwError(() => new Error(error.message));
              }),
            );
          } else {
            return this.accessTokenSubject.pipe(
              filter(accessToken => accessToken !== null),
              take(1),
              switchMap(token => {
                req = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                return next.handle(req);
              }),
            );
          }
        }
        return throwError(() => new Error(error.message));
      }),
    );
  }
}
