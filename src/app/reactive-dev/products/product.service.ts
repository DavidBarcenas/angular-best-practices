import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, throwError } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsAPI = 'https://fakestoreapi.com/products';
  categories$ = this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  products$ = this.http.get<Product[]>(this.productsAPI).pipe(catchError(this.handleError));

  private productSelectedSubject = new BehaviorSubject<number>(0);
  productSelectedAction$ = this.productSelectedSubject.asObservable();

  selectedProduct$: Observable<Product | undefined> = combineLatest([
    this.products$,
    this.productSelectedAction$,
  ]).pipe(
    map(([products, selectedProductId]) =>
      products.find(product => product.id === selectedProductId),
    ),
  );

  productsByCategory$ = (category: string) =>
    this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`);

  constructor(private http: HttpClient) {}

  selectProductChanged(selectProductId: number): void {
    this.productSelectedSubject.next(selectProductId);
  }

  private handleError({ error }: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${error.status}: ${error.message}`;
    }
    console.error(error);
    return throwError(() => errorMessage);
  }
}
