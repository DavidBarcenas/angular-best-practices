import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list-alt',
  templateUrl: './product-list-alt.component.html',
  styleUrls: ['./product-list-alt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListAltComponent {
  products$ = this.productService.products$;
  selectedProduct$ = this.productService.selectedProduct$;
  errorMessage = '';

  constructor(private productService: ProductService) {}

  onSelected(productId: number): void {
    this.productService.selectProductChanged(productId);
  }
}
