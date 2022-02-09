import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from '@layout/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@modules/auth/authentication.module').then(
        m => m.AuthenticationModule,
      ),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('@modules/users/users.module').then(m => m.UsersModule),
      },
      {path: '', redirectTo: '/dashboard/users', pathMatch: 'full'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
