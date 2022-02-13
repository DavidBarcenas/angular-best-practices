import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Observable, tap} from 'rxjs';
import {environment} from '@env/environment';
import {
  GetToken,
  GetTokenResponse,
  RefreshToken,
} from '@data/models/auth.model';
import {handleError} from '@utils/handle-error';

const UNAUTHORIZED_STATUS = 401;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  invalidCredentials = false;
  constructor(private http: HttpClient, private router: Router) {}

  login(auth: GetToken): Observable<GetTokenResponse> {
    return this.http
      .post<GetTokenResponse>(environment.apiUrl + environment.getToken, auth)
      .pipe(
        tap(res => this.saveToken(res.token)),
        catchError((error: HttpErrorResponse) => {
          if (error.status === UNAUTHORIZED_STATUS) {
            this.invalidCredentials = true;
          }
          return handleError(error);
        }),
      );
  }

  refreshToken(): Observable<GetTokenResponse> {
    const token = this.getToken();
    const payload = new RefreshToken(token);
    return this.http
      .post<GetTokenResponse>(
        environment.apiUrl + environment.refreshToken,
        payload,
      )
      .pipe(
        tap(res => this.saveToken(res.token)),
        catchError(error => handleError(error)),
      );
  }

  isAuthenticated(): boolean {
    return Boolean(this.getToken());
  }

  getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  hasToken(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

  removeToken(): void {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  logout(): void {
    this.removeToken();
    this.router.navigateByUrl('/login');
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }
}
