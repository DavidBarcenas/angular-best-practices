import { Injectable } from '@angular/core';
import { Product } from '../products/product';
import { combineLatest, map, scan, shareReplay, Subject } from 'rxjs';

type ActionType = 'add' | 'update' | 'delete' | 'none';
interface Action<T> {
  item: T;
  action: ActionType;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemSubject = new Subject<Action<Product>>();
  itemActions$ = this.itemSubject.asObservable();
  cartItems$ = this.itemActions$.pipe(
    scan((items: Product[], itemAction: Action<Product>) => this.modifyCart(items, itemAction), []),
    shareReplay(1)
  );

  totalCartItems$ = this.cartItems$.pipe(map(items => items.length));

  // Total up the extended price for each item
  subTotal$ = this.cartItems$.pipe(
    map(items => items.reduce((a, b) => a + b.quantity * b.price, 0))
  );

  // Delivery is free if spending more than $30
  deliveryFree$ = this.subTotal$.pipe(map(t => (t < 30 ? 5.99 : 0)));

  // Tax could be based on shipping address zip code
  tax$ = this.subTotal$.pipe(map(t => Math.round(t * 10.75) / 100));

  // Total price
  totalPrice$ = combineLatest([this.subTotal$, this.deliveryFree$, this.tax$]).pipe(
    map(([subTotal, delivery, tax]) => subTotal + delivery + tax)
  );

  addToCart(product: Product): void {
    this.itemSubject.next({
      item: product,
      action: 'add'
    });
  }

  // Return the updated array of cart items
  private modifyCart(items: Product[], operation: Action<Product>): Product[] {
    if (operation.action === 'add') {
      return items.find(item => item.id === operation.item.id)
        ? [...items]
        : [...items, operation.item];
    }
    return [...items];
  }
}
