import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrelloClonRoutingModule } from './trello-clon-routing.module';
import { TrelloClonComponent } from './trello-clon.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [TrelloClonComponent, LoginComponent],
  imports: [CommonModule, TrelloClonRoutingModule]
})
export class TrelloClonModule {}
