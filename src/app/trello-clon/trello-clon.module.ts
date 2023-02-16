import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverlayModule } from '@angular/cdk/overlay';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { TrelloClonRoutingModule } from './trello-clon-routing.module';
import { TrelloClonComponent } from './trello-clon.component';
import { LoginComponent } from './pages/login/login.component';
import { BtnComponent } from './components/btn/btn.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    TrelloClonComponent,
    LoginComponent,
    BtnComponent,
    BoardsComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    TrelloClonRoutingModule,
    OverlayModule,
    FontAwesomeModule,
    CdkAccordionModule
  ]
})
export class TrelloClonModule {}
