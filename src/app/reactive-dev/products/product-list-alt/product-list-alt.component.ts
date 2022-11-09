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
  selector: 'app-product-list-alt',
  templateUrl: './product-list-alt.component.html',
  styleUrls: ['./product-list-alt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListAltComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  products: Product[] = [];
  errorMessage = '';
  selectedProductId = 0;
  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: products => ((this.products = products), this.cdr.markForCheck()),
      error: err => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
