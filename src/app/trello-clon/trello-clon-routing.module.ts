import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrelloClonComponent } from './trello-clon.component';

const routes: Routes = [{ path: '', component: TrelloClonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrelloClonRoutingModule {}
