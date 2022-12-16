import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'styling-components',
    loadChildren: () =>
      import('./styling-components/styling-components.module').then(m => m.StylingComponentsModule)
  },
  {
    path: 'reactive-code',
    loadChildren: () =>
      import('./reactive-code/reactive-code.module').then(m => m.ReactiveCodeModule)
  },
  {
    path: 'reactive-ecommerce',
    loadChildren: () =>
      import('./reactive-ecommerce/reactive-ecommerce.module').then(m => m.ReactiveEcommerceModule)
  },
  { path: '', redirectTo: 'reactive-ecommerce', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
