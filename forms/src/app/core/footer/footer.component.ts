import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input()
  year: number | undefined;

  @Output()
  yearChange = new EventEmitter<number>();

  @HostListener('click')
  onHandleClick() {
    if (this.year) {
      // does not modify the parent's data
      // this.year += 1;

      // Two-way binding - does modify the parent data
      this.yearChange.emit(this.year + 1);
    }
  }
}
