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
  shareReplay,
  switchMap
} from 'rxjs';
import { HeroResponse } from './hero';
import { Params } from '@angular/router';

const { marvelAPIUrl, marvelAPIPublicKey } = environment;
const characters = `${marvelAPIUrl}/v1/public/characters`;
const increaseDefaultPage = 1;
const defaultPage = 0;
const limitLow = 10;
const limitMid = 25;
const limitHigh = 100;

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private pageSubject = new BehaviorSubject(defaultPage);
  private limitSubject = new BehaviorSubject(limitMid);

  private params$ = combineLatest([
    this.pageSubject.pipe(debounceTime(500)),
    this.limitSubject
  ]).pipe(
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
    map(([page, limit]) => {
      const params: Params = {
        apikey: marvelAPIPublicKey,
        offset: page * limit,
        limit
      };
      return params;
    })
  );

  private heroesResponse$: Observable<HeroResponse> = this.params$.pipe(
    switchMap((params: Params) => {
      return this.http.get<HeroResponse>(characters, { params });
    }),
    shareReplay(1)
  );

  heroes$ = this.heroesResponse$.pipe(map(res => res.data.results));
  totalResults$ = this.heroesResponse$.pipe(map(res => res.data.total));
  currentPage$ = this.pageSubject.pipe(map(page => page + increaseDefaultPage));
  totalPages$ = combineLatest([this.totalResults$, this.limitSubject]).pipe(
    map(([totalResults, limit]) => Math.ceil(totalResults / limit))
  );
  limits = [limitLow, limitMid, limitHigh];
  constructor(private http: HttpClient) {}

  movePageBy(moveBy: number) {
    const currentPage = this.pageSubject.getValue();
    this.pageSubject.next(currentPage + moveBy);
  }

  setLimit(newLimit: number) {
    this.limitSubject.next(newLimit);
    this.pageSubject.next(defaultPage);
  }
}
