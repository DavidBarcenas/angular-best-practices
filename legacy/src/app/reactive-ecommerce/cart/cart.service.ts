import { Injectable } from '@angular/core';
import { Product } from '../products/product';
import { combineLatest, map, scan, shareReplay, Subject } from 'rxjs';
import { ProductComponent } from '../product/product.component';

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
  deliveryFree$ = this.subTotal$.pipe(map(t => (t > 0 && t < 30 ? 5.99 : 0)));

  // Tax could be based on shipping address zip code
  tax$ = this.subTotal$.pipe(map(t => Math.round(t * 10.75) / 100));

  // Total price
  totalPrice$ = combineLatest([this.subTotal$, this.deliveryFree$, this.tax$]).pipe(
    map(([subTotal, delivery, tax]) => subTotal + delivery + tax)
  );

  addToCart(product: Product, action: ActionType): void {
    this.itemSubject.next({
      item: product,
      action
    });
  }

  removeFromCart(product: Product): void {
    this.itemSubject.next({
      item: product,
      action: 'delete'
    });
  }

  // Return the updated array of cart items
  private modifyCart(items: Product[], operation: Action<Product>): Product[] {
    if (operation.action === 'add') {
      const itemExists = items.find(item => item.id === operation.item.id);
      return itemExists ? [...items] : [...items, operation.item];
    }
    if (operation.action === 'update') {
      return items.map(item => (item.id === operation.item.id ? operation.item : item));
    }
    if (operation.action === 'delete') {
      return items.filter(item => item.id !== operation.item.id);
    }
    return [...items];
  }
}
