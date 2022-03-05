import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {InterceptorService} from './auth.interceptor';

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
];
