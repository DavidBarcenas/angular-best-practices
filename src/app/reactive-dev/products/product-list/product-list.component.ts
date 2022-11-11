import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, EMPTY, Observable, switchMap } from 'rxjs';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  errorMessage = '';
  defaultCategory = 'all';
  selected = new FormControl(this.defaultCategory, [Validators.required]);
  // Stream action
  private categorySelectedSubject = new BehaviorSubject<string>(this.defaultCategory);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();
  // Data source
  categories$ = this.productService.categories$;
  products$ = this.categorySelectedAction$.pipe(
    switchMap(category => this.getProducts(category)),
    catchError(error => this.handleError(error)),
  );

  constructor(private productService: ProductService) {}

  onAddProduct() {
    this.productService.addProduct();
  }

  onSelected(category: string) {
    this.categorySelectedSubject.next(category);
  }

  private getProducts(category: string): Observable<Product[]> {
    return category === this.defaultCategory
      ? this.productService.productsWithAdd$
      : this.productService.productsByCategory$(category);
  }

  private handleError(error: HttpErrorResponse) {
    this.errorMessage = error.message;
    return EMPTY;
  }
}
