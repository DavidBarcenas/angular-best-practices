import {coreComponents, httpInterceptorProviders} from './core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from 'src/app/login/login.component';
import {NgModule} from '@angular/core';
import {SharedModule} from '@shared/shared.module';
import {layoutComponents} from './layout';

@NgModule({
  declarations: [AppComponent, LoginComponent, coreComponents, layoutComponents],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
