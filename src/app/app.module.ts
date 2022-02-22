import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {CoreModule} from '@core/core.module';
import {DashboardComponent} from './layout/dashboard/dashboard.component';
import {InterceptorService} from '@core/services/interceptor.service';
import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {SidenavComponent} from './layout/sidenav/sidenav.component';
import {HeaderComponent} from './layout/header/header.component';
import {BreadcrumbsComponent} from './layout/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidenavComponent,
    HeaderComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
