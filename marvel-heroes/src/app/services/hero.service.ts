import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroResponse$ = this.http.get(environment.marvelAPI, {
    params: {
      apikey: environment.marvelAPIPublicKey,
      limit: 10,
      offset: 0,
    },
  });

  constructor(private http: HttpClient) {}
}
