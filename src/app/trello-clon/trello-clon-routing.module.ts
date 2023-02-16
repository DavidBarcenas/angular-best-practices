import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';
import { LoginComponent } from './pages/login/login.component';
import { TrelloClonComponent } from './trello-clon.component';

const routes: Routes = [
  {
    path: '',
    component: TrelloClonComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'boards', component: BoardsComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrelloClonRoutingModule {}
