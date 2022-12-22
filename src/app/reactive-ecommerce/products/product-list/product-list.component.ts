import { Component, inject } from '@angular/core';
import { ProductsService } from '../products.service';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  EMPTY,
  map,
  Observable,
  Subject,
  tap
} from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  private productsService = inject(ProductsService);
  private router = inject(Router);
  private errorMessageSubject = new Subject<string>();
  errorMessage$: Observable<string> = this.errorMessageSubject.asObservable();

  vm$ = combineLatest([
    this.productsService.categories$,
    this.productsService.productsByCategory$,
    this.productsService.selectedCategory$,
    this.productsService.loading$
  ]).pipe(
    map(([categories, products, selectedCategory, loading]) => ({
      categories,
      products,
      selectedCategory,
      loading
    })),
    catchError(error => this.handleError(error))
  );

  selectCategory(category: string) {
    this.productsService.setCategory(category);
  }

  goToDetailPage(id: number): void {
    this.router.navigate(['/reactive-ecommerce/product', id]);
  }

  private handleError(error: any): Observable<never> {
    this.errorMessageSubject.next(error);
    return EMPTY;
  }

  get skeleton() {
    const shared = { height: '1em', borderRadius: '2em' };
    return {
      items: Array(8),
      card: { height: '300px' },
      title: { ...shared, width: '70%' },
      price: { ...shared, width: '20%', marginLeft: '10%' },
      description: { ...shared, width: '85%', height: '.75em' },
      button: { ...shared, width: '30%', display: 'block' }
    };
  }
}
