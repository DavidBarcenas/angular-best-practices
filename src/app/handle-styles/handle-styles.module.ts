import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { HandleStylesComponent } from './handle-styles.component';
import { HandleStylesRoutingModule } from './handle-styles.routing';
@NgModule({
  declarations: [NavComponent, HandleStylesComponent],
  imports: [CommonModule, HandleStylesRoutingModule],
})
export class HandleStylesModule {}
