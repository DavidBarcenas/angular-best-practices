import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HandleStylesComponent } from './handle-styles.component';

const routes: Routes = [
  {
    path: '',
    component: HandleStylesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HandleStylesRoutingModule {}
