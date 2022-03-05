import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {InterceptorService} from '@core/services/interceptor.service';
import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {coreComponents} from './core';
import {layoutComponents} from './layout';

@NgModule({
  declarations: [AppComponent, coreComponents, layoutComponents],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
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
