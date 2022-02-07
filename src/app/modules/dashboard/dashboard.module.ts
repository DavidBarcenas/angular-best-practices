import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from '../../layout/layout.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [LayoutComponent, ViewComponent],
  imports: [DashboardRoutingModule, SharedModule],
})
export class DashboardModule {}
