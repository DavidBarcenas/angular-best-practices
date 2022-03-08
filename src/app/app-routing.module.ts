import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './layout';
import {DashboardGuard} from '@core/guards/dashboard.guard';
import {LoginComponent} from 'src/app/login/login.component';
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
        loadChildren: () => import('src/app/users/users.module').then(m => m.UsersModule),
      },
      {
        path: 'roles',
        loadChildren: () => import('src/app/roles/roles.module').then(m => m.RolesModule),
      },
      {path: '', redirectTo: 'users', pathMatch: 'full'},
    ],
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    component: LoginComponent,
  },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
