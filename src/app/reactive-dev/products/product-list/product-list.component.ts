import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { catchError, EMPTY } from 'rxjs';
import { Category } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  selected = new FormControl('all', [Validators.required]);
  errorMessage = '';
  categories: Category[] = [];
  products$ = this.productService.products$.pipe(
    catchError(error => {
      this.errorMessage = error;
      return EMPTY;
    }),
  );

  constructor(private productService: ProductService) {}
  getCategories() {
    console.log('implement logic');
  }
}
