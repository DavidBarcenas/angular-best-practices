import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarPrimaryComponent } from './components/navigation/navbar-primary/navbar-primary.component';
import { NavbarSecondaryComponent } from './components/navigation/navbar-secondary/navbar-secondary.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, NavbarPrimaryComponent, NavbarSecondaryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class StylingComponentsModule {}
