import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY, Subject } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list-alt',
  templateUrl: './product-list-alt.component.html',
  styleUrls: ['./product-list-alt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListAltComponent {
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  selectedProduct$ = this.productService.selectedProduct$;
  products$ = this.productService.products$.pipe(
    catchError(error => {
      this.errorMessageSubject.next(error);
      return EMPTY;
    }),
  );

  constructor(private productService: ProductService) {}

  onSelected(productId: number): void {
    this.productService.selectProductChanged(productId);
  }
}
