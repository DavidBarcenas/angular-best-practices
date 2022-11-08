import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveDevComponent } from './reactive-dev.component';

const routes: Routes = [{ path: '', component: ReactiveDevComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReactiveDevRoutingModule {}
