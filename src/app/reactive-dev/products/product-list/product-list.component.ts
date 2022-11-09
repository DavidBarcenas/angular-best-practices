import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category, Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit, OnDestroy {
  private subs!: Subscription;
  selected = new FormControl('all', [Validators.required]);
  products: Product[] = [];
  categories: Category[] = [];
  errorMessage = '';

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.subs = this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.getCategories();
        this.cdr.markForCheck();
      },
      error: error => (this.errorMessage = error),
    });
  }

  getCategories() {
    const categoriesSet = new Set(this.products.map(p => p.category));
    this.categories = [...categoriesSet];
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
