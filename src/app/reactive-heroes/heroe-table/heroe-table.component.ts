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
  currentPage$ = this.heroService.currentPage$;
  totalResults$ = this.heroService.totalResults$;
  totalPages$ = this.heroService.totalPages$;

  constructor(public heroService: HeroeService) {}

  doSearch(e: Event) {
    const value = (e?.target as HTMLInputElement).value;
    this.heroService.searchSubject.next(value);
  }
}
