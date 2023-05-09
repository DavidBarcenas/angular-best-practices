import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  imports: [CommonModule, LayoutRoutingModule, LayoutComponent]
})
export class LayoutModule {}
