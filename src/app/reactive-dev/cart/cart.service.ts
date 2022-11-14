import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  carts$ = this.http.get<Cart[]>('https://fakestoreapi.com/carts');
  constructor(private http: HttpClient) {}
}
