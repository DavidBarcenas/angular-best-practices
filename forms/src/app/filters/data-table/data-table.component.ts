import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  @Input('data') data: any[] = [];
}
