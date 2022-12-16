import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceComponent } from './ecommerce.component';

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
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ReactiveEcommerceModule {}
