import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { HeroeService } from '../heroe.service';

@Component({
  selector: 'app-heroe-table',
  templateUrl: './heroe-table.component.html',
  styleUrls: ['./heroe-table.component.scss'],
})
export class HeroeTableComponent {
  vm$ = combineLatest([
    this.heroService.heroes$,
    this.heroService.search$,
    this.heroService.currentPage$,
    this.heroService.limit$,
    this.heroService.totalResults$,
    this.heroService.totalPages$,
    this.heroService.loading$,
  ]).pipe(
    map(([heroes, search, page, limit, totalResults, totalPages, loading]) => ({
      heroes,
      search,
      page,
      limit,
      totalResults,
      totalPages,
      loading,
      disableNext: totalPages === page,
      disablePev: page === 1,
    })),
  );

  constructor(public heroService: HeroeService) {}

  doSearch(e: Event) {
    const value = (e?.target as HTMLInputElement).value;
    this.heroService.doSearch(value);
  }

  movePageBy(moveBy: number) {
    this.heroService.movePageBy(moveBy);
  }

  setLimit(limit: number) {
    this.heroService.setLimit(limit);
  }
}
