import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list-alt',
  templateUrl: './product-list-alt.component.html',
  styleUrls: ['./product-list-alt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListAltComponent implements OnInit {
  private sub!: Subscription;
  products$ = this.productService.products$;
  errorMessage = '';
  selectedProductId = 0;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.usersWithCart$.subscribe(data => console.log(data));
  }

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
