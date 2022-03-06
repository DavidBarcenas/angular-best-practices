import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './layout';
import {DashboardGuard} from '@core/guards/dashboard.guard';
import {LoginGuard} from '@core/guards/login.guard';
import {NgModule} from '@angular/core';
import {NotFoundComponent} from './core';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [
      {
        path: 'users',
        loadChildren: () => import('@modules/users/users.module').then(m => m.UsersModule),
      },
      {path: '', redirectTo: 'users', pathMatch: 'full'},
    ],
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
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
