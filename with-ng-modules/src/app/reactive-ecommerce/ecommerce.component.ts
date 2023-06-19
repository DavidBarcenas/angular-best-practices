import { Component, inject } from '@angular/core';
import { CartService } from './cart/cart.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterOutlet, AsyncPipe]
})
export class EcommerceComponent {
  cartService = inject(CartService);
  totalCartItems$ = this.cartService.totalCartItems$;
}
