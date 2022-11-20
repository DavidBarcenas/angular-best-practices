import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
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
export const DEFAULT_PAGE = 0;
export const INCREASE_DEFAULT_PAGE = 1;

@Injectable({
  providedIn: 'root',
})
export class HeroeService {
  limits = LIMITS;

  private searchSubject = new BehaviorSubject(DEFAULT_SEARCH);
  private limitSubject = new BehaviorSubject(LIMIT_HIGH);
  private pageSubject = new BehaviorSubject(DEFAULT_PAGE);
  private loadingSubject = new BehaviorSubject(false);

  search$ = this.searchSubject.asObservable();
  limit$ = this.limitSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();

  private heroesResponseCache: { [key: string]: HeroResponse } = {};

  private params$ = combineLatest([
    this.searchSubject.pipe(debounceTime(500)),
    this.limitSubject,
    this.pageSubject.pipe(debounceTime(500)),
  ]).pipe(
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
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
    // debounceTime(500),
    tap(() => this.loadingSubject.next(true)),
    switchMap((_params: Params) => {
      const paramsStr = JSON.stringify(_params);
      if (this.heroesResponseCache[paramsStr]) {
        return of(this.heroesResponseCache[paramsStr]);
      }
      return this.http
        .get<HeroResponse>(HERO_API, { params: { ..._params } })
        .pipe(tap(res => (this.heroesResponseCache[paramsStr] = res)));
    }),
    tap(() => this.loadingSubject.next(false)),
    shareReplay(1),
  );

  currentPage$ = this.pageSubject.pipe(map(page => page + INCREASE_DEFAULT_PAGE));
  totalResults$ = this.heroesResponse$.pipe(map(res => res.data.total));
  heroes$ = this.heroesResponse$.pipe(map(res => res.data.results));
  totalPages$ = combineLatest([this.totalResults$, this.limitSubject]).pipe(
    map(([totalResults, limit]) => Math.ceil(totalResults / limit)),
  );

  constructor(private http: HttpClient) {}

  doSearch(term: string) {
    this.searchSubject.next(term);
    this.pageSubject.next(DEFAULT_PAGE);
  }

  movePageBy(moveBy: number) {
    const currentPage = this.pageSubject.getValue();
    this.pageSubject.next(currentPage + moveBy);
  }

  setLimit(newLimit: number) {
    this.limitSubject.next(newLimit);
    this.pageSubject.next(DEFAULT_PAGE);
  }
}
