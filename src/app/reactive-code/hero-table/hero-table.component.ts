import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss']
})
export class HeroTableComponent {
  limits = this.heroService.limits;
  vm$ = combineLatest([
    this.heroService.heroes$,
    this.heroService.search$,
    this.heroService.currentPage$,
    this.heroService.limit$,
    this.heroService.totalResults$,
    this.heroService.totalPages$,
    this.heroService.loading$
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
      disablePrev: page === 1
    }))
  );
  constructor(private readonly heroService: HeroService) {}

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
