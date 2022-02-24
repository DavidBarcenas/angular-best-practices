/* eslint-disable @typescript-eslint/no-explicit-any */
import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GridColumns, GridDataColumns} from '@shared/interfaces/grid.interface';

import {Observable} from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  displayedColumns: string[] = [];
  displayedDataColumns: GridDataColumns[] = [];
  @Input() data!: Observable<any>;
  @Input()
  set columns(gridColumns: GridColumns[]) {
    const data: GridDataColumns[] = [];
    const slugs = gridColumns.map(column => {
      const dataItem = {
        name: column.name,
        key: column.key,
        slug: column.name.trim().toLowerCase().replace(/ /g, '-'),
      };
      data.push(dataItem);
      return dataItem.slug;
    });
    this.displayedColumns = slugs;
    this.displayedDataColumns = data;
  }
  constructor() {}

  ngOnInit(): void {}
}
