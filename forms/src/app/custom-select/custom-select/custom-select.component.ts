import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DestroyRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { SelectionModel } from '@angular/cdk/collections';
import { merge, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './custom-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('dropdown', [
      state('void', style({ opacity: 0, transform: 'scale(1, 0.8)' })),
      state('*', style({ opacity: 1, transform: 'scale(1,1)' })),
      transition(':enter', [animate('120ms cubic-bezier(0, 0, 0.2, 1)')]),
      transition(':leave', [animate('100ms linear')]),
    ]),
  ],
  styles: [
    `
      :host.opened {
        pointer-events: none;
      }
    `,
  ],
})
export class CustomSelectComponent implements AfterViewInit {
  @ViewChild('trigger')
  parent: CdkOverlayOrigin | undefined;

  @Input()
  label = '';

  @Input()
  set value(value: string | null) {
    this.selectionModel.clear();
    if (value) {
      this.selectionModel.select(value);
    }
  }

  get value() {
    return this.selectionModel.selected[0] || null;
  }

  private selectionModel = new SelectionModel<string>();

  @Output()
  readonly opened = new EventEmitter<void>();

  @Output()
  readonly closed = new EventEmitter<void>();

  @Output()
  readonly selectionChanged = new EventEmitter<string>();

  @HostListener('click')
  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  @ContentChildren(SelectOptionComponent, { descendants: true })
  options: QueryList<SelectOptionComponent> | undefined;

  @HostBinding('class.opened')
  isOpen = false;

  defaultWidth = 'auto';
  private destoryRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    this.defaultWidth = this.parent?.elementRef.nativeElement.getBoundingClientRect().width + 'px';
    this.highlightOption(this.value);
    this.selectionModel.changed.pipe(takeUntilDestroyed(this.destoryRef)).subscribe((values) => {
      values.removed.forEach((value) => this.findOptionsByValue(value)?.deselect());
    });
    this.options?.changes
      .pipe(
        startWith<QueryList<SelectOptionComponent>>(this.options),
        switchMap((options) => merge(...options.map((option) => option.selected))),
        takeUntilDestroyed(this.destoryRef)
      )
      .subscribe((selectedOption) => this.handleSelection(selectedOption));
  }

  onPanelAnimationDone({ fromState, toState }: AnimationEvent): void {
    if (fromState === 'void' && toState === null && this.isOpen) {
      this.opened.emit();
    }
    if (fromState === null && toState === 'void' && !this.isOpen) {
      this.closed.emit();
    }
  }

  private handleSelection(selectedOption: SelectOptionComponent): void {
    if (selectedOption.value) {
      this.selectionModel.toggle(selectedOption.value);
      this.selectionChanged.emit(selectedOption.value);
    }
    this.close();
  }

  private highlightOption(value: string | null): void {
    this.findOptionsByValue(value)?.highlightAsSelected();
  }

  private findOptionsByValue(value: string | null): SelectOptionComponent | undefined {
    return this.options && this.options.find((option) => option.value === value);
  }
}
