import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'styling-components',
    loadChildren: () =>
      import('./styling-components/styling-components.module').then(m => m.StylingComponentsModule)
  },
  { path: '', redirectTo: 'styling-components', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
