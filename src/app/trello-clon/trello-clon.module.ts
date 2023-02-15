import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrelloClonRoutingModule } from './trello-clon-routing.module';
import { TrelloClonComponent } from './trello-clon.component';

@NgModule({
  declarations: [TrelloClonComponent],
  imports: [CommonModule, TrelloClonRoutingModule]
})
export class TrelloClonModule {}
