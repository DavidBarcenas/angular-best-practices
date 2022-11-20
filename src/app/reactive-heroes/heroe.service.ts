import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  Observable,
  shareReplay,
  switchMap,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HeroResponse } from './heroe';

interface Params {
  apikey: string;
  offset: number;
  limit: number;
  nameStartsWith?: string;
}

const { url, publicKey } = environment.marvelAPI;
const HERO_API = `${url}/v1/public/characters`;
// Our Limits for Search
const LIMIT_LOW = 10;
const LIMIT_MID = 25;
const LIMIT_HIGH = 100;
const LIMITS = [LIMIT_LOW, LIMIT_MID, LIMIT_HIGH];
const DEFAULT_SEARCH = '';
const DEFAULT_PAGE = 0;
const INCREASE_DEFAULT_PAGE = 1;

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  limits = LIMITS;

  searchSubject = new BehaviorSubject(DEFAULT_SEARCH);
  limitSubject = new BehaviorSubject(LIMIT_HIGH);
  pageSubject = new BehaviorSubject(DEFAULT_PAGE);

  private params$ = combineLatest([this.searchSubject, this.limitSubject, this.pageSubject]).pipe(
    map(([searchTerm, limit, page]) => {
      const params: Params = {
        apikey: publicKey,
        offset: page * limit,
        limit,
      };
      if (searchTerm.length) {
        params.nameStartsWith = searchTerm;
      }
      return params;
    }),
  );

  private heroesResponse$: Observable<HeroResponse> = this.params$.pipe(
    debounceTime(500),
    switchMap(_params => this.http.get<HeroResponse>(HERO_API, { params: { ..._params } })),
    shareReplay(1),
  );

  currentPage$ = this.pageSubject.pipe(map(page => page + INCREASE_DEFAULT_PAGE));
  totalResults$ = this.heroesResponse$.pipe(map(res => res.data.total));
  heroes$ = this.heroesResponse$.pipe(map(res => res.data.results));
  totalPages$ = combineLatest([this.totalResults$, this.limitSubject]).pipe(
    map(([totalResults, limit]) => Math.ceil(totalResults / limit)),
  );

  constructor(private http: HttpClient) {}
}
