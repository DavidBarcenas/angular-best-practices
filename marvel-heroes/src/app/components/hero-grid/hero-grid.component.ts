import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroService } from '../../services/hero.service';
import { combineLatest, map } from 'rxjs';
import { totalRecords } from '../../utils/constants';
import { HeroCardComponent } from '../hero-card/hero-card.component';

@Component({
  selector: 'app-hero-grid',
  standalone: true,
  imports: [CommonModule, HeroCardComponent],
  templateUrl: './hero-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroGridComponent implements OnDestroy {
  private readonly heroService = inject(HeroService);

  vm$ = combineLatest([
    this.heroService.heroes$,
    this.heroService.search$,
    this.heroService.currentPage$,
    this.heroService.limit$,
    this.heroService.totalResults$,
    this.heroService.totalPages$,
    this.heroService.loading$,
  ]).pipe(
    map(([heroes, search, currentPage, limit, totalResults, totalPages, loading]) => ({
      heroes,
      search,
      currentPage,
      limit,
      totalResults,
      totalPages,
      loading,
      nextIsDisabled: currentPage === totalPages,
      prevIsDisabled: currentPage === 1,
    }))
  );

  limits: number[] = Object.values(totalRecords);

  doSearch(e: Event): void {
    const target = e.target as HTMLInputElement;
    this.heroService.doSearch(target.value);
  }

  movePageBy(amount: number): void {
    this.heroService.movePageBy(amount);
  }

  setLimit(limit: number): void {
    this.heroService.setLimit(limit);
  }

  ngOnDestroy() {
    this.heroService.clearCache();
  }
}
