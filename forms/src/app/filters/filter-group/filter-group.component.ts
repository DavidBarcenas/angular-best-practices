import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSliderModule, Options } from 'ngx-slider-v2';

@Component({
  selector: 'app-filter-group',
  standalone: true,
  imports: [CommonModule, NgxSliderModule],
  templateUrl: './filter-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterGroupComponent {
  ratingOptions: Options = {
    floor: 0,
    ceil: 10,
  };
  dateOptions: Options = {
    floor: 2000,
    ceil: 2023,
  };
  movieGenres = ['Action', 'Horror', 'Comedy', 'Drama', 'Fantasy', 'Adventure', 'Classics'];
  languages = ['English', 'French', 'German', 'Spanish', 'Italian', 'Russian'];
  orderList = ['new', 'featured'];
}
