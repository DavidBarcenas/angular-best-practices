import { Component } from '@angular/core';
import { HeroeService } from '../heroe.service';

@Component({
  selector: 'app-heroe-table',
  templateUrl: './heroe-table.component.html',
  styleUrls: ['./heroe-table.component.scss'],
})
export class HeroeTableComponent {
  heroes$ = this.heroService.heroes$;
  search$ = this.heroService.searchSubject;
  limit$ = this.heroService.limitSubject;
  currentPage$ = this.heroService.currentPage$;
  totalResults$ = this.heroService.totalResults$;
  totalPages$ = this.heroService.totalPages$;

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
  }
}
