import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveDevComponent } from './reactive-dev.component';
import { UserResolver } from './users/user-resolver.service';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: ReactiveDevComponent,
    children: [
      { path: 'users', component: UsersComponent, resolve: { users: UserResolver } },
      {
        path: 'products',
        loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReactiveDevRoutingModule {}
