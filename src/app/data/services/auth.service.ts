import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {environment} from '@env/environment';
import {
  GetToken,
  GetTokenResponse,
  RefreshToken,
} from '@data/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  constructor(private http: HttpClient, private router: Router) {}

  login(auth: GetToken): Observable<GetTokenResponse> {
    return this.http
      .post<GetTokenResponse>(environment.apiUrl + environment.getToken, auth)
      .pipe(tap(res => this.saveToken(res.token)));
  }

  refreshToken(): Observable<GetTokenResponse> {
    const token = this.getToken();
    const payload = new RefreshToken(token);
    return this.http
      .post<GetTokenResponse>(
        environment.apiUrl + environment.refreshToken,
        payload,
      )
      .pipe(tap(res => this.saveToken(res.token)));
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
