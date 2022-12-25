import { Component, inject } from '@angular/core';
import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent {
  cartService = inject(CartService);
  totalCartItems$ = this.cartService.totalCartItems$;
}
