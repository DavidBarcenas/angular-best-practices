import { Component, inject } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  product$ = this.productsService.product$(
    parseInt(this.route.snapshot.paramMap.get('id')! || '0')
  );
}
