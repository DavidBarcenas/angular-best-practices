export * from './breadcrumbs/breadcrumbs.component';
export * from './dashboard/dashboard.component';
export * from './header/header.component';
export * from './sidenav/sidenav.component';

import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from './header/header.component';
import {SidenavComponent} from './sidenav/sidenav.component';

export const layoutComponents = [
  DashboardComponent,
  HeaderComponent,
  SidenavComponent,
  BreadcrumbsComponent,
];
