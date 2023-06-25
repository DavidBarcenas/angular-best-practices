import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterGroupComponent } from './filter-group/filter-group.component';
import { DataTableComponent } from './data-table/data-table.component';
import { movieListMock } from './mock-data';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FilterGroupComponent, DataTableComponent],
  templateUrl: './filters.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  movies = movieListMock;

  filterData(filters: any) {
    this.movies = movieListMock.filter((movie: any) => {
      for (const filtro in filters) {
        if (!filters[filtro]) continue;

        if (filtro === 'date') {
          const { min, max } = filters[filtro];
          if (movie.date < min || movie.date > max) return false;
        } else if (filtro === 'genres') {
          if (!filters[filtro].includes(movie.genre.toLowerCase())) return false;
        } else if (filtro === 'languages') {
          if (!filters[filtro].includes(movie.language.toLowerCase())) return false;
        } else if (filtro === 'query') {
          if (!movie.title.toLowerCase().includes(filters[filtro].toLowerCase())) return false;
        } else if (filtro === 'orderBy') {
          if (movie.status.toLowerCase() !== filters[filtro].toLowerCase()) return false;
        } else {
          if (filters[filtro].toString().toLowerCase() !== filters[filtro].toString().toLowerCase()) {
            return false;
          }
        }
      }
      return true;
    });
  }
}
