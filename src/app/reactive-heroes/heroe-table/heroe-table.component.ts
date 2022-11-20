import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { HeroeService, DEFAULT_PAGE } from '../heroe.service';

@Component({
  selector: 'app-heroe-table',
  templateUrl: './heroe-table.component.html',
  styleUrls: ['./heroe-table.component.scss'],
})
export class HeroeTableComponent {
  vm$ = combineLatest([
    this.heroService.heroes$,
    this.heroService.searchSubject,
    this.heroService.currentPage$,
    this.heroService.limitSubject,
    this.heroService.totalResults$,
    this.heroService.totalPages$,
  ]).pipe(
    map(([heroes, search, page, limit, totalResults, totalPages]) => ({
      heroes,
      search,
      page,
      limit,
      totalResults,
      totalPages,
      disableNext: totalPages === page,
      disablePev: page === 1,
    })),
  );

  constructor(public heroService: HeroeService) {}

  doSearch(e: Event) {
    const value = (e?.target as HTMLInputElement).value;
    this.heroService.searchSubject.next(value);
  }

  movePageBy(moveBy: number) {
    const currentPage = this.heroService.pageSubject.getValue();
    this.heroService.pageSubject.next(currentPage + moveBy);
  }

  setLimit(limit: number) {
    this.heroService.limitSubject.next(limit);
    this.heroService.pageSubject.next(DEFAULT_PAGE);
  }
}
