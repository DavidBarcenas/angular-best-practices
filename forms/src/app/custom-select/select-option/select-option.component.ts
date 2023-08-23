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
import { Highlightable } from '@angular/cdk/a11y';

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
        &.active {
          @apply bg-blue-50;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectOptionComponent<T> implements Highlightable {
  @Input()
  value: T | null = null;

  @Input()
  disabledHint: string | null = null;

  @Input({ transform: booleanAttribute })
  @HostBinding('class.disabled')
  disabled = false;

  @Output()
  selected = new EventEmitter<SelectOptionComponent<T>>();

  @HostListener('click')
  protected select(): void {
    this.highlightAsSelected();
    this.selected.emit(this);
  }

  @HostBinding('class.selected')
  protected isSelected = false;

  @HostBinding('class.active')
  protected isActive = false;

  private cd = inject(ChangeDetectorRef);

  setActiveStyles(): void {
    this.isActive = true;
    this.cd.markForCheck();
  }

  setInactiveStyles(): void {
    this.isActive = false;
    this.cd.markForCheck();
  }

  highlightAsSelected(): void {
    this.isSelected = true;
    this.cd.markForCheck();
  }

  deselect(): void {
    this.isSelected = false;
  }
}
