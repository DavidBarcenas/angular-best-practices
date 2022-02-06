import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './core/guards/dashboard.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        m => m.AuthenticationModule,
      ),
  },
  {
    path: 'dashboard',
    canActivate: [DashboardGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
