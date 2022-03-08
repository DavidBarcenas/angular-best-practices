import {CanActivate, Router, UrlTree} from '@angular/router';
import {Observable, map, take} from 'rxjs';

import {AuthService} from '@core/auth.service';
import {Injectable} from '@angular/core';

const TAKE_FIRST = 1;

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      take(TAKE_FIRST),
      map(isLogged => {
        if (!isLogged) {
          return this.router.parseUrl('/login');
        }
        return true;
      }),
    );
  }
}
