import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductsRoutingModule } from './products.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListAltComponent } from './product-list-alt/product-list-alt.component';
import { ShellComponent } from './product-list-alt/shell/shell.component';
import { DetailComponent } from './product-list-alt/detail/detail.component';

@NgModule({
  declarations: [ProductListComponent, ProductListAltComponent, ShellComponent, DetailComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
  ],
})
export class ProductsModule {}
