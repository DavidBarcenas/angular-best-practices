import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { HeroService } from '../hero.service';
import { combineLatest, map } from 'rxjs';
import { HeroCardComponent } from '../hero-card/hero-card.component';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf, NgFor, HeroCardComponent, AsyncPipe]
})
export class HeroTableComponent implements OnDestroy {
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

  doSearch(e: Event): void {
    const value = (e?.target as HTMLInputElement).value;
    this.heroService.doSearch(value);
  }

  movePageBy(moveBy: number): void {
    this.heroService.movePageBy(moveBy);
  }

  setLimit(limit: number): void {
    this.heroService.setLimit(limit);
  }

  ngOnDestroy(): void {
    this.heroService.clearHeroCache();
  }
}
