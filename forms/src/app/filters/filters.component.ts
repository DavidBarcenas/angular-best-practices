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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {
  movies = movieListMock;

  filterData(filters: any) {
    this.movies = movieListMock.map(this.valueToLowerCase).filter((movie) => this.onFilter(movie, filters));
  }

  onFilter(movie: any, filters: any) {
    return Object.keys(filters).every((key) => {
      switch (key) {
        case 'query':
          return movie.title.includes(filters[key]) || movie.id.includes(filters[key]);
        case 'orderBy':
          return filters[key] === movie.status;
        case 'date':
        case 'rating':
          return movie[key] >= filters[key].min && movie[key] <= filters[key].max;
        default:
          return filters[key].includes(movie[key]);
      }
    });
  }

  valueToLowerCase(movie: any) {
    return {
      ...movie,
      id: movie.id.toString(),
      genre: movie.genre.toLowerCase(),
      language: movie.language.toLowerCase(),
      title: movie.title.toLowerCase(),
      status: movie.status.toLowerCase(),
    };
  }

  sorting() {
    this.movies.sort((a, b) => {
      if (a.title > b.title) return 1;
      if (a.title < b.title) return -1;
      return 0;
    });
  }
}
