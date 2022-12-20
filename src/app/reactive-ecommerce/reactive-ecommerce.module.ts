import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceComponent } from './ecommerce.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AlertComponent } from './shared/alert/alert.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
    children: [
      { path: 'products', component: ProductListComponent },
      { path: 'product/:id', component: ProductComponent },
      { path: '', pathMatch: 'full', redirectTo: 'products' }
    ]
  }
];
@NgModule({
  declarations: [EcommerceComponent, AlertComponent, ProductListComponent, ProductComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgxSkeletonLoaderModule, NgOptimizedImage]
})
export class ReactiveEcommerceModule {}
