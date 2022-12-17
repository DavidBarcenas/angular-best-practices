import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  skeletonCommon = { height: '1em', borderRadius: '2em' };
  skeleton = {
    items: Array(8),
    card: { height: '300px' },
    title: { ...this.skeletonCommon, width: '70%' },
    price: { ...this.skeletonCommon, width: '20%', marginLeft: '10%' },
    description: { ...this.skeletonCommon, width: '85%', height: '.75em' },
    button: { ...this.skeletonCommon, width: '30%', display: 'block' }
  };
}
