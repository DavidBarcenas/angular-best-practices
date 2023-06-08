import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

const { fakeTrelloAPI } = environment;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(email: string, password: string) {
    return this.http.post(`${fakeTrelloAPI}/api/v1/auth/login`, { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${fakeTrelloAPI}/api/v1/auth/register`, { name, email, password });
  }

  isAvailable(email: string) {
    return this.http.post<{ isAvailable: boolean }>(`${fakeTrelloAPI}/api/v1/auth/is-available`, {
      email
    });
  }
}
