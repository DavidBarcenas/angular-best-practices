import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  map,
  merge,
  Observable,
  scan,
  Subject,
  throwError,
} from 'rxjs';
import { Category, Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  categories$ = this.http.get<string[]>('https://fakestoreapi.com/products/categories');
  products$ = this.http
    .get<Product[]>('https://fakestoreapi.com/products')
    .pipe(catchError(this.handleError));

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

  private productInsertedSubject = new Subject<Product>();
  productInsertedAction$ = this.productInsertedSubject.asObservable();

  productsWithAdd$ = merge(this.products$, this.productInsertedAction$).pipe(
    scan((acc, value) => (value instanceof Array ? [...value] : [...acc, value]), [] as Product[]),
  );

  productsByCategory$ = (category: string) =>
    this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${category}`);

  constructor(private http: HttpClient) {}

  addProduct(newProduct?: Product) {
    newProduct = newProduct || this.fakeProduct();
    this.productInsertedSubject.next(newProduct);
  }

  selectProductChanged(selectProductId: number): void {
    this.productSelectedSubject.next(selectProductId);
  }

  private fakeProduct(): Product {
    return {
      id: 100,
      category: Category.Jewelry,
      description: 'Another One',
      image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
      price: 234.9,
      rating: {
        count: 89,
        rate: 23,
      },
      title: 'Our new product',
    };
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
