import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReactiveDevComponent } from './reactive-dev.component';

const routes: Routes = [
  {
    path: '',
    component: ReactiveDevComponent,
    children: [
      { path: 'welcome', component: HomeComponent },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
      },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReactiveDevRoutingModule {}
