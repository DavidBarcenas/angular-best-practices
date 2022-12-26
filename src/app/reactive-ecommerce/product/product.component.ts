import { Component, inject } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Product } from '../products/product';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);
  private quantitySubject = new BehaviorSubject(1);
  product$ = this.productsService.product$(parseInt(this.route.snapshot.paramMap.get('id') || '0'));

  quantity$ = this.quantitySubject.asObservable();
  skeleton = this.buildSkeleton();
  vm$: Observable<{ product: Product; quantity: number }> = combineLatest([
    this.product$,
    this.quantity$
  ]).pipe(map(([product, quantity]) => ({ product, quantity })));

  changeQuantity(quantity: number): void {
    const accQuantity = this.quantitySubject.getValue();
    this.quantitySubject.next(accQuantity + quantity);
  }

  addToCart(product: Product, quantity: number): void {
    const item = { ...product, quantity };
    this.cartService.addToCart(item, 'update');
  }

  private buildSkeleton() {
    return [
      { height: '2em', width: '80%' },
      { height: '.9em', width: '60%' },
      { height: '.9em', width: '50%' },
      {
        height: '1.5em',
        width: '20%',
        display: 'block',
        margin: '2em 0'
      },
      {
        height: '1.85em',
        width: '20%',
        borderRadius: '2em',
        marginRight: '2em',
        marginBottom: '2em',
        count: 2
      },
      {
        height: '3em',
        width: '50%',
        display: 'block',
        count: 2
      }
    ];
  }
}
