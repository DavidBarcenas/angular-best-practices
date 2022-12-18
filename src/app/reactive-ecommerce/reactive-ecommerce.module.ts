import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceComponent } from './ecommerce.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const routes: Routes = [
  {
    path: '',
    component: EcommerceComponent,
    children: [
      { path: 'products', component: ProductsComponent },
      { path: '', pathMatch: 'full', redirectTo: 'products' }
    ]
  }
];
@NgModule({
  declarations: [ProductsComponent, EcommerceComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgxSkeletonLoaderModule, NgOptimizedImage]
})
export class ReactiveEcommerceModule {}
