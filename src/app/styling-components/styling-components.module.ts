import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarPrimaryComponent } from './components/navigation/navbar-primary/navbar-primary.component';
import { NavbarSecondaryComponent } from './components/navigation/navbar-secondary/navbar-secondary.component';
import { PromoComponent } from './promo/promo.component';
import { ThumbnailListComponent } from './components/content/thumbnail-list/thumbnail-list.component';
import { TabsComponent } from './components/content/tabs/tabs.component';
import { TabsPaneComponent } from './components/content/tabs/tabs-pane.component';
import { AccordionComponent } from './components/content/accordion/accordion.component';
import { AccordionPaneComponent } from './components/content/accordion/accordion-pane.component';
import { PillsComponent } from './components/navigation/pills/pills.component';
import {
  TooltipComponent,
  TooltipMessageDirective
} from './components/popups/tooltip/tooltip.component';
import {
  ModalComponent,
  ModalContentDirective,
  ModalHighlightDirective
} from './components/popups/modal/modal.component';
import {
  MessageComponent,
  MessageContentDirective,
  MessageTitleDirective
} from './components/content/message/message.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    NavbarPrimaryComponent,
    NavbarSecondaryComponent,
    PromoComponent,
    ThumbnailListComponent,
    ModalComponent,
    ModalContentDirective,
    ModalHighlightDirective,
    TabsComponent,
    TabsPaneComponent,
    MessageComponent,
    MessageTitleDirective,
    MessageContentDirective,
    AccordionComponent,
    AccordionPaneComponent,
    PillsComponent,
    TooltipComponent,
    TooltipMessageDirective
  ],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class StylingComponentsModule {}
