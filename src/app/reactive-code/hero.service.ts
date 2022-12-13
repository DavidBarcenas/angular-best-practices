import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { HeroResponse } from './hero';

const { marvelAPIUrl, marvelAPIPublicKey } = environment;
const characters = `${marvelAPIUrl}/v1/public/characters`;

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  heroes$ = this.http
    .get<HeroResponse>(characters, {
      params: {
        apikey: marvelAPIPublicKey
      }
    })
    .pipe(map(res => res.data.results));
  constructor(private http: HttpClient) {}
}
