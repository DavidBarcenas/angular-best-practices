import {Injectable} from '@angular/core';
import {environment} from '@env/environment';
import {ApiService} from './api.service';
import {GetToken, GetTokenResponse} from '@data/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  login(payload: GetToken) {
    this.api
      .post<GetTokenResponse>(environment.getToken, payload)
      .subscribe(res => console.log(res));
  }
}
