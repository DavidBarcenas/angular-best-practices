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
    path: 'reactive-code-store',
    loadChildren: () =>
      import('./reactive-code-store/reactive-code-store.module').then(
        m => m.ReactiveCodeStoreModule
      )
  },
  { path: '', redirectTo: 'reactive-code-store', pathMatch: 'full' }
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
