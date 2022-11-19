import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero, HeroResponse } from './heroe';

const { url, publicKey } = environment.marvelAPI;
const HERO_API = `${url}/v1/public/characters`;
// Our Limits for Search
const LIMIT_LOW = 10;
const LIMIT_MID = 25;
const LIMIT_HIGH = 100;
const LIMITS = [LIMIT_LOW, LIMIT_MID, LIMIT_HIGH];

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  limits = LIMITS;

  heroes$: Observable<Hero[]> = this.http
    .get<HeroResponse>(HERO_API, {
      params: {
        apikey: publicKey,
        limit: LIMIT_LOW,
        offset: 0,
      },
    })
    .pipe(map(res => res.data.results));

  constructor(private http: HttpClient) {}
}
