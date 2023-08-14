import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
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

        &.disabled {
          @apply opacity-40 pointer-events-none justify-between;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent {
  @Input()
  value: string | null = null;

  @Input()
  disabledHint: string | null = null;

  @Input({ transform: booleanAttribute })
  @HostBinding('class.disabled')
  disabled = false;

  @Output()
  selected = new EventEmitter<SelectOptionComponent>();

  @HostListener('click')
  protected select(): void {
    this.highlightAsSelected();
    this.selected.emit(this);
  }

  @HostBinding('class.selected')
  protected isSelected = false;

  private cd = inject(ChangeDetectorRef);

  highlightAsSelected(): void {
    this.isSelected = true;
    this.cd.markForCheck();
  }

  deselect(): void {
    this.isSelected = false;
  }
}
