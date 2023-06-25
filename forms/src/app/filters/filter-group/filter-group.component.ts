import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSliderModule, Options } from 'ngx-slider-v2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-group',
  standalone: true,
  imports: [CommonModule, NgxSliderModule, FormsModule],
  templateUrl: './filter-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterGroupComponent {
  @Output('activeFilters') activeFilters = new EventEmitter<any>();
  ratingOptions: Options = {
    floor: 0,
    ceil: 10,
  };
  dateOptions: Options = {
    floor: 2000,
    ceil: 2023,
  };
  movieGenres = [
    { name: 'action', checked: false },
    { name: 'horror', checked: false },
    {
      name: 'comedy',
      checked: false,
    },
    { name: 'drama', checked: false },
    { name: 'fantasy', checked: false },
    {
      name: 'adventure',
      checked: false,
    },
    { name: 'classic', checked: false },
  ];
  languages = [
    { name: 'english', checked: false },
    { name: 'french', checked: false },
    {
      name: 'german',
      checked: false,
    },
    { name: 'spanish', checked: false },
    { name: 'italian', checked: false },
    { name: 'russian', checked: false },
  ];
  orderList = ['new', 'featured'];

  filters: any = {
    query: '',
    languages: [],
    genres: [],
    orderBy: '',
    rating: {
      min: 0,
      max: 10,
    },
    date: {
      min: 2000,
      max: 2023,
    },
  };

  onFiltersChange() {
    this.filters.languages = this.languages.filter((l) => l.checked).map((l) => l.name);
    this.filters.genres = this.movieGenres.filter((g) => g.checked).map((g) => g.name);
    console.log(this.cleanEmptyProperties({ ...this.filters }));
    this.activeFilters.emit(this.cleanEmptyProperties({ ...this.filters }));
  }

  cleanEmptyProperties(obj: any) {
    for (let prop in obj) {
      if (obj[prop] === null || obj[prop] === undefined || obj[prop] === '') {
        delete obj[prop];
      } else if (typeof obj[prop] === 'object') {
        if (Array.isArray(obj[prop])) {
          obj[prop] = obj[prop].filter((value: any) => value !== '');
          if (obj[prop].length === 0) {
            delete obj[prop];
          }
        } else {
          this.cleanEmptyProperties(obj[prop]);
          if (Object.keys(obj[prop]).length === 0) {
            delete obj[prop];
          }
        }
      }
    }
    return obj;
  }
}
