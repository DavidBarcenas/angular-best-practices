import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarPrimaryComponent } from './components/navigation/navbar-primary/navbar-primary.component';
import { NavbarSecondaryComponent } from './components/navigation/navbar-secondary/navbar-secondary.component';
import { PromoComponent } from './promo/promo.component';
import { ThumbnailListComponent } from './components/content/thumbnail-list/thumbnail-list.component';
import {
  ModalComponent,
  ModalContentDirective,
  ModalHighlightDirective
} from './components/popups/modal/modal.component';

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
    ModalHighlightDirective
  ],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class StylingComponentsModule {}
