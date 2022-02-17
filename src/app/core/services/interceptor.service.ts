/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  finalize,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import {AuthService} from '@data/services/auth.service';
import {Injectable} from '@angular/core';
import {LoadingService} from '@shared/services/loading/loading.service';

const UNAUTHORIZED_STATUS = 401;
const TAKE_FIRST = 1;

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  refreshTokenInProgress = false;
  accessTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private authService: AuthService,
    private loadingservice: LoadingService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.loadingservice.setLoading(true, req.url);
    return this.authService.isLoggedIn().pipe(
      take(TAKE_FIRST),
      switchMap(isLogged => {
        if (isLogged) {
          req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${this.authService.getToken()}`,
            },
          });
        }
        return next
          .handle(req)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              this.loadingservice.setLoading(false, req.url);
              if (error instanceof HttpErrorResponse) {
                if (error.status === UNAUTHORIZED_STATUS && isLogged) {
                  if (!this.refreshTokenInProgress) {
                    this.refreshTokenInProgress = true;
                    this.accessTokenSubject.next(null);
                    return this.authService.refreshToken().pipe(
                      switchMap(res => {
                        this.refreshTokenInProgress = false;
                        this.accessTokenSubject.next(res.token);
                        req = req.clone({
                          setHeaders: {
                            Authorization: `Bearer ${res.token}`,
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
                  }

                  return this.accessTokenSubject.pipe(
                    filter(accessToken => accessToken !== null),
                    take(TAKE_FIRST),
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
              return throwError(() => error);
            }),
          )
          .pipe(finalize(() => this.loadingservice.setLoading(false, req.url)));
      }),
    );
  }
}
