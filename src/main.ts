import {AppInjector} from '@core/utils/app-injector';
import {AppModule} from './app/app.module';
import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(moduleRef => AppInjector.setInjector(moduleRef.injector))
  .catch(err => console.error(err));
