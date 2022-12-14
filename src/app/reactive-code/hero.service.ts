import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
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
  tap
} from 'rxjs';
import { HeroResponse } from './hero';
import { Params } from '@angular/router';

interface HeroAPIParams {
  apikey: string;
  offset: number;
  limit: number;
  nameStartsWith?: string;
}

const { marvelAPIUrl, marvelAPIPublicKey } = environment;
const characters = `${marvelAPIUrl}/v1/public/characters`;
const defaultSearch = '';
const defaultPage = 0;
const limitLow = 10;
const limitMid = 25;
const limitHigh = 100;
const increaseDefaultPage = 1;
const heroCache = new Map();

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private searchSubject = new BehaviorSubject(defaultSearch);
  private pageSubject = new BehaviorSubject(defaultPage);
  private limitSubject = new BehaviorSubject(limitMid);
  private loadingSubject = new BehaviorSubject(false);

  private params$ = combineLatest([
    this.searchSubject.pipe(debounceTime(500)),
    this.pageSubject.pipe(debounceTime(500)),
    this.limitSubject
  ]).pipe(
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
    map(([searchTerm, page, limit]) => {
      const params: HeroAPIParams = {
        apikey: marvelAPIPublicKey,
        offset: page * limit,
        limit
      };
      if (searchTerm.length) {
        params.nameStartsWith = searchTerm;
      }
      return params;
    })
  );

  private heroesResponse$: Observable<HeroResponse> = this.params$.pipe(
    tap(() => this.loadingSubject.next(true)),
    switchMap((params: Params) => {
      const paramsStr = JSON.stringify(params);
      if (heroCache.has(paramsStr)) {
        return of(heroCache.get(paramsStr));
      }
      return this.http
        .get<HeroResponse>(characters, { params })
        .pipe(tap(res => heroCache.set(paramsStr, res)));
    }),
    tap(() => this.loadingSubject.next(false)),
    shareReplay(1)
  );

  heroes$ = this.heroesResponse$.pipe(map(res => res.data.results));
  totalResults$ = this.heroesResponse$.pipe(map(res => res.data.total));
  currentPage$ = this.pageSubject.pipe(map(page => page + increaseDefaultPage));
  totalPages$ = combineLatest([this.totalResults$, this.limitSubject]).pipe(
    map(([totalResults, limit]) => Math.ceil(totalResults / limit))
  );
  search$ = this.searchSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  limit$ = this.limitSubject.asObservable();
  limits = [limitLow, limitMid, limitHigh];

  constructor(private http: HttpClient) {}

  doSearch(term: string): void {
    this.searchSubject.next(term);
    this.pageSubject.next(defaultPage);
  }

  movePageBy(moveBy: number): void {
    const currentPage = this.pageSubject.getValue();
    this.pageSubject.next(currentPage + moveBy);
  }

  setLimit(newLimit: number): void {
    this.limitSubject.next(newLimit);
    this.pageSubject.next(defaultPage);
  }

  clearHeroCache(): void {
    heroCache.clear();
  }
}
