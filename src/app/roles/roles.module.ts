import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RoleGridComponent} from './role-grid/role-grid.component';
import {RoleModulesComponent} from './role-modules/role-modules.component';
import {RolesRoutingModule} from './roles-routing.module';

@NgModule({
  declarations: [RoleGridComponent, RoleModulesComponent],
  imports: [CommonModule, RolesRoutingModule],
})
export class RolesModule {}
