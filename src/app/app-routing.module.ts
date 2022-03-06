import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './layout';
import {DashboardGuard} from '@core/guards/dashboard.guard';
import {NgModule} from '@angular/core';
import {NotFoundComponent} from './core';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        canActivate: [DashboardGuard],
        loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule),
      },
      {path: '', redirectTo: 'users', pathMatch: 'full'},
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@modules/auth/authentication.module').then(m => m.AuthenticationModule),
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
