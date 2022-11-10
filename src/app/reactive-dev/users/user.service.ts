import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$ = this.http.get<User[]>('https://fakestoreapi.com/users');
  constructor(private http: HttpClient) {}
}
