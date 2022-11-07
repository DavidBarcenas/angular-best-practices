import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandaloneComponent } from './standalone/standalone.component';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'styling-components',
    loadChildren: () =>
      import('./styling-components/styling-components.module').then(m => m.StylingComponentsModule),
  },
  {
    path: 'standalone',
    loadComponent: () =>
      import('./standalone/standalone.component').then(c => c.StandaloneComponent),
  },
  { path: '', redirectTo: 'standalone', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
