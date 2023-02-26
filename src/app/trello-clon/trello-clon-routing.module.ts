import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { LoginComponent } from './pages/login/login.component';
import { ScrollComponent } from './pages/scroll/scroll.component';
import { TrelloClonComponent } from './trello-clon.component';

const routes: Routes = [
  {
    path: '',
    component: TrelloClonComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'boards', component: BoardsComponent },
      { path: 'board', component: BoardComponent },
      { path: 'scroll', component: ScrollComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrelloClonRoutingModule {}
