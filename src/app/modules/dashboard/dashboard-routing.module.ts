import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@layout/layout.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', component: ViewComponent },
  {
    path: 'users',
    component: LayoutComponent,
  },
  { path: '**', redirectTo: '/dashboard/users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
