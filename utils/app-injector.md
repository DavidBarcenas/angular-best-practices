# App Injector

app-injector.ts

```js
import {Injector} from '@angular/core';

export class AppInjector {
  private static injector: Injector;

  static setInjector(injector: Injector) {
    AppInjector.injector = injector;
  }

  static getInjector(): Injector {
    return AppInjector.injector;
  }
}
```
some-class.ts
```js
// ejemplo de la inyección de http-client
const injector = AppInjector.getInjector();
this.http = injector.get(HttpClient);
```

main.ts

```js
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(moduleRef => AppInjector.setInjector(moduleRef.injector))
  .catch(err => console.error(err));
```