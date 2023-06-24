import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterGroupComponent } from './filter-group/filter-group.component';
import { DataTableComponent } from './data-table/data-table.component';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FilterGroupComponent, DataTableComponent],
  templateUrl: './filters.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent {}
