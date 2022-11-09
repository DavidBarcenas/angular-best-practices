import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subs!: Subscription;
  products: Product[] = [];
  errorMessage = '';

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subs = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.cdr.detectChanges();
      },
      error: error => (this.errorMessage = error),
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
