import { Component, inject } from '@angular/core';
import { CartService } from './cart.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  private cartService = inject(CartService);
  skeleton = this.buildSkeleton();
  vm$ = combineLatest([
    this.cartService.cartItems$,
    this.cartService.subTotal$,
    this.cartService.tax$,
    this.cartService.deliveryFree$,
    this.cartService.totalPrice$
  ]).pipe(
    map(([cartItems, subTotal, tax, delivery, total]) => ({
      cartItems,
      subTotal,
      tax,
      delivery,
      total
    }))
  );

  private buildSkeleton() {
    return {
      reviewTitle: { width: '16em', marginBottom: '2em' },
      orderTitle: { width: '10em', marginBottom: '2em' },
      img: { width: '4em', height: '4em', marginRight: '3em' },
      product: { width: '8em', height: '.8em', display: 'block' },
      desc: { width: '5em', height: '.5em' },
      price: { width: '5em', height: '.8em', display: 'block', marginLeft: 'auto' },
      quantity: { width: '8em', height: '.5em' },
      total: { width: '5em', height: '.5em' },
      amount: { width: '4em', height: '.8em' },
      btn: { height: '2em', marginTop: '2em', borderRadius: '3em' },
      reviewItems: Array(4),
      orderItems: Array(5)
    };
  }
}
