import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OverlayModule } from '@angular/cdk/overlay';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DialogModule } from '@angular/cdk/dialog';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { TrelloClonRoutingModule } from './trello-clon-routing.module';
import { TrelloClonComponent } from './trello-clon.component';
import { LoginComponent } from './pages/login/login.component';
import { BtnComponent } from './components/btn/btn.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoardComponent } from './pages/board/board.component';
import { ModalComponent } from './components/modal/modal.component';
import { ScrollComponent } from './pages/scroll/scroll.component';

@NgModule({
  declarations: [
    TrelloClonComponent,
    LoginComponent,
    BtnComponent,
    BoardsComponent,
    NavbarComponent,
    BoardComponent,
    ModalComponent,
    ScrollComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TrelloClonRoutingModule,
    OverlayModule,
    FontAwesomeModule,
    CdkAccordionModule,
    DragDropModule,
    DialogModule,
    ScrollingModule
  ]
})
export class TrelloClonModule {}
