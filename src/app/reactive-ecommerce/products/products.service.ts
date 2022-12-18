import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from './product';
import { map } from 'rxjs';

const { fakeStoreAPI } = environment;
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);
  products$ = this.http.get<Product[]>(`${fakeStoreAPI}/products`).pipe(
    map(products =>
      products.map(product => ({
        ...product,
        title: product.description.slice(0, 25) + '...',
        description: product.description.slice(0, 30) + '...'
      }))
    )
  );
}
