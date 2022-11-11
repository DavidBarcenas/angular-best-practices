import { ChangeDetectionStrategy, Component } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';

import { ProductService } from '../../product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  errorMessage = '';
  product$ = this.productService.selectedProduct$.pipe(
    catchError(error => {
      this.errorMessage = error;
      return EMPTY;
    }),
  );

  constructor(private productService: ProductService) {}
}
