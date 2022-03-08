import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {RoleGridComponent} from './role-grid/role-grid.component';
import {RoleModulesComponent} from './role-modules/role-modules.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'internal', component: RoleGridComponent},
      {path: 'corporate', component: RoleGridComponent},
      {path: 'agencies', component: RoleGridComponent},
      {path: 'modules', component: RoleModulesComponent},
      {path: '', redirectTo: 'internal', pathMatch: 'full'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
