import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from './product';
import { BehaviorSubject, distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';

const { fakeStoreAPI } = environment;
const defaultCategory = 'all';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private selectedCategory = new BehaviorSubject(defaultCategory);
  categories$ = this.http
    .get<string[]>(`${fakeStoreAPI}/products/categories`)
    .pipe(map(categories => [defaultCategory, ...categories]));
  selectedCategory$ = this.selectedCategory.asObservable();
  products$ = this.http.get<Product[]>(`${fakeStoreAPI}/products`);
  productsByCategory$: Observable<Product[]> = this.selectedCategory$.pipe(
    distinctUntilChanged(),
    switchMap(category =>
      category === defaultCategory
        ? this.products$
        : this.http.get<Product[]>(`${fakeStoreAPI}/products/category/${category}`)
    ),
    map(products =>
      products.map(product => ({
        ...product,
        title: product.description.slice(0, 25) + '...',
        description: product.description.slice(0, 30) + '...'
      }))
    )
  );

  setCategory(category: string) {
    this.selectedCategory.next(category);
  }
}
