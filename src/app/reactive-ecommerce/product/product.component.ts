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

  skeleton = this.buildSkeleton();

  buildSkeleton() {
    return [
      { height: '2em', width: '80%' },
      { height: '.9em', width: '60%' },
      { height: '.9em', width: '50%' },
      {
        height: '1.5em',
        width: '20%',
        display: 'block',
        margin: '2em 0'
      },
      {
        height: '1.85em',
        width: '20%',
        borderRadius: '2em',
        marginRight: '2em',
        marginBottom: '2em',
        count: 2
      },
      {
        height: '3em',
        width: '50%',
        display: 'block',
        count: 2
      }
    ];
  }
}
