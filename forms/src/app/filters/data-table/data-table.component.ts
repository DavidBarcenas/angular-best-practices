import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  @Output('sort') sort = new EventEmitter<boolean>();
  @Input('data') data: any[] = [];

  sorting() {
    this.sort.emit(true);
  }
}
