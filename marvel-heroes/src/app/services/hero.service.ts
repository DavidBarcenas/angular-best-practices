import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Params } from '@angular/router';
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
import { environment } from '../../environments/environment';
import { ApiParams, HeroResponse } from '../interfaces/api';
import {
  amountPageIncrease,
  heroCache,
  initialDebounceTime,
  initialPage,
  initialSearch,
  totalRecords,
} from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private readonly http = inject(HttpClient);

  private searchSubject = new BehaviorSubject(initialSearch);
  private pageSubject = new BehaviorSubject(initialPage);
  private limitSubject = new BehaviorSubject(totalRecords.mid);
  private loadingSubject = new BehaviorSubject(false);

  // * Manejamos el estado de los parámetros que necesita la petición
  private params$ = combineLatest([
    this.searchSubject.pipe(debounceTime(initialDebounceTime)),
    this.pageSubject.pipe(debounceTime(initialDebounceTime)),
    this.limitSubject,
  ]).pipe(
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
    map(([searchTerm, page, limit]) => {
      const params: ApiParams = {
        apikey: environment.marvelAPIPublicKey,
        offset: page * limit,
        limit,
      };
      if (searchTerm.length) {
        params.nameStartsWith = searchTerm;
      }
      return params;
    })
  );

  // * La petición se realiza cada vez que se cambia un parámetro
  // * La respuesta se guarda en un cache para evitar volver a llamar a la API
  private heroesResponse$: Observable<HeroResponse> = this.params$.pipe(
    tap(() => this.loadingSubject.next(true)),
    switchMap((params: Params) => {
      const currentParams = JSON.stringify(params);
      if (heroCache.has(currentParams)) {
        return of(heroCache.get(currentParams));
      }
      return this.http
        .get<HeroResponse>(environment.marvelAPI, { params })
        .pipe(tap((res) => heroCache.set(currentParams, res)));
    }),
    tap(() => this.loadingSubject.next(false)),
    shareReplay(1)
  );

  // * Observables que necesita la vista para mostrar los datos
  search$ = this.searchSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  limit$ = this.limitSubject.asObservable();
  heroes$ = this.heroesResponse$.pipe(map((res) => res.data));
  totalResults$ = this.heroesResponse$.pipe(map((res) => res.data.total));
  currentPage$ = this.pageSubject.pipe(map((page) => page + amountPageIncrease));
  totalPages$ = combineLatest([this.totalResults$, this.limitSubject]).pipe(
    map(([total, limit]) => Math.ceil(total / limit))
  );

  doSearch(searchTerm: string) {
    this.searchSubject.next(searchTerm);
    this.pageSubject.next(initialPage);
  }

  movePageBy(amount: number) {
    const currentPage = this.pageSubject.getValue();
    this.pageSubject.next(currentPage + amount);
  }

  setLimit(limit: number) {
    this.limitSubject.next(limit);
    this.pageSubject.next(initialPage);
  }

  clearCache() {
    heroCache.clear();
  }
}
