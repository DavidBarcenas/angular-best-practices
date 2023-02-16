import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrelloClonRoutingModule } from './trello-clon-routing.module';
import { TrelloClonComponent } from './trello-clon.component';
import { LoginComponent } from './pages/login/login.component';
import { BtnComponent } from './components/btn/btn.component';

@NgModule({
  declarations: [TrelloClonComponent, LoginComponent, BtnComponent],
  imports: [CommonModule, TrelloClonRoutingModule]
})
export class TrelloClonModule {}
