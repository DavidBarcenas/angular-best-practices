import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from '@data/services/auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpTokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticated()) {
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${this.authService.getToken()}`,
        },
      });
    }
    return next.handle(req);
  }
}
