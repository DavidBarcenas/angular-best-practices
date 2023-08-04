import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-option.component.html',
  styles: [
    `
      :host {
        @apply p-2 flex items-center cursor-pointer hover:bg-gray-100;
        &.selected {
          @apply before:content-['✔︎'] before:animate-checked-option before:origin-bottom-left;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent {
  @Input()
  value: string | null = null;

  @Output()
  selected = new EventEmitter<SelectOptionComponent>();

  @HostListener('click')
  select(): void {
    this.isSelected = true;
    this.selected.emit(this);
  }

  @HostBinding('class.selected')
  protected isSelected = false;

  deselect(): void {
    this.isSelected = false;
  }
}
