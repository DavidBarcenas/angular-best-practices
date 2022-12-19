import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from './product';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
  tap,
  throwError
} from 'rxjs';

const { fakeStoreAPI } = environment;
const defaultCategory = 'all';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  private selectedCategorySubject = new BehaviorSubject(defaultCategory);
  private loadingSubject = new BehaviorSubject(false);
  selectedCategory$ = this.selectedCategorySubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  categories$ = this.http.get<string[]>(`${fakeStoreAPI}/products/categories`).pipe(
    map(categories => [defaultCategory, ...categories]),
    catchError(this.handleError)
  );
  products$ = this.http
    .get<Product[]>(`${fakeStoreAPI}/products`)
    .pipe(catchError(this.handleError));
  productsByCategory$: Observable<Product[]> = this.selectedCategory$.pipe(
    distinctUntilChanged(),
    tap(() => this.loadingSubject.next(true)),
    switchMap(category =>
      category === defaultCategory
        ? this.products$
        : this.http
            .get<Product[]>(`${fakeStoreAPI}/products/category/${category}`)
            .pipe(catchError(this.handleError))
    ),
    map(products =>
      products.map(product => ({
        ...product,
        title: product.description.slice(0, 25) + '...',
        description: product.description.slice(0, 30) + '...'
      }))
    ),
    tap(() => this.loadingSubject.next(false))
  );

  setCategory(category: string) {
    this.selectedCategorySubject.next(category);
  }

  private handleError({ error }: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred ${error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend return code ${error.status}: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
