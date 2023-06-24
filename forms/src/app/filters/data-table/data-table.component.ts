import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { movieListMock } from '../mock-data';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  movies = movieListMock;
}
