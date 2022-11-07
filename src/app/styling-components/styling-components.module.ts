import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylingComponentsComponent } from './styling-components.component';
import { SharedModule } from '../shared/shared.module';
import { PromoComponent } from './promo/promo.component';

@NgModule({
  declarations: [StylingComponentsComponent, PromoComponent],
  imports: [CommonModule, SharedModule],
})
export class StylingComponentsModule {}
