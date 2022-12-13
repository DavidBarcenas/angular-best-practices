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
const defaultPage = 0;

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private pageSubject = new BehaviorSubject(defaultPage);

  private params$ = combineLatest([this.pageSubject.pipe(debounceTime(500))]).pipe(
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
    map(([page]) => {
      const params: Params = {
        apikey: marvelAPIPublicKey,
        offset: page
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
  constructor(private http: HttpClient) {}

  movePageBy(moveBy: number) {
    const currentPage = this.pageSubject.getValue();
    this.pageSubject.next(currentPage + moveBy);
  }
}
