import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users$ = this.http.get<User[]>('https://fakestoreapi.com/users');
  usersWithCart$ = combineLatest([this.users$, this.cartService.carts$]).pipe(
    map(([users, carts]) =>
      users.map(
        user =>
          ({
            ...user,
            cart: carts.find(cart => cart.userId === user.id)?.products.length || 0,
          } as User),
      ),
    ),
  );
  constructor(private http: HttpClient, private cartService: CartService) {}
}
