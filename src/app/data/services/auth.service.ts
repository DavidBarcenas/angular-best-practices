import {BehaviorSubject, Observable, share, tap} from 'rxjs';
import {GetToken, GetTokenResponse, RefreshToken} from '@data/models/auth.model';

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  invalidCredentials = false;

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
      .post<GetTokenResponse>(environment.apiUrl + environment.refreshToken, payload)
      .pipe(tap(res => this.saveToken(res.token)));
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable().pipe(share());
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
    this.isLoginSubject.next(false);
    this.router.navigateByUrl('/login');
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
    this.isLoginSubject.next(true);
  }
}
