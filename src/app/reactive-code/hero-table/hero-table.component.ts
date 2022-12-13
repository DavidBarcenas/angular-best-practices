import { Component } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss']
})
export class HeroTableComponent {
  limits = this.heroService.limits;
  heroes$ = this.heroService.heroes$;
  page$ = this.heroService.currentPage$;
  totalPages$ = this.heroService.totalPages$;
  totalResults$ = this.heroService.totalResults$;
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
