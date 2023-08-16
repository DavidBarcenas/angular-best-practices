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
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { SelectOptionComponent } from '../select-option/select-option.component';
import { SelectionModel } from '@angular/cdk/collections';
import { merge, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type SelectValue<T> = T | null;

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
export class CustomSelectComponent<T> implements OnChanges, AfterViewInit {
  @ViewChild('trigger')
  parent: CdkOverlayOrigin | undefined;

  @Input()
  label = '';

  @Input()
  displayWith: ((value: T) => string | number) | null = null;

  @Input()
  compareWith: (value1: SelectValue<T>, value2: SelectValue<T>) => boolean = (value1, value2) => value1 === value2;

  @Input()
  set value(value: SelectValue<T>) {
    this.selectionModel.clear();
    if (value) {
      this.selectionModel.select(value);
    }
  }

  get value() {
    return this.selectionModel.selected[0] || null;
  }

  private selectionModel = new SelectionModel<T>();

  @Output()
  readonly opened = new EventEmitter<void>();

  @Output()
  readonly closed = new EventEmitter<void>();

  @Output()
  readonly selectionChanged = new EventEmitter<SelectValue<T>>();

  @HostListener('click')
  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  @ContentChildren(SelectOptionComponent, { descendants: true })
  options: QueryList<SelectOptionComponent<T>> | undefined;

  @HostBinding('class.opened')
  isOpen = false;

  defaultWidth = 'auto';
  private destroyRef = inject(DestroyRef);

  protected get displayValue() {
    if (this.displayWith && this.value) {
      return this.displayWith(this.value);
    }
    return this.value;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['compareWith']) {
      this.selectionModel.compareWith = changes['compareWith'].currentValue;
      this.highlightOption(this.value);
    }
  }

  ngAfterViewInit(): void {
    this.defaultWidth = this.parent?.elementRef.nativeElement.getBoundingClientRect().width + 'px';
    this.highlightOption(this.value);
    this.selectionModel.changed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((values) => {
      values.removed.forEach((value) => this.findOptionsByValue(value)?.deselect());
      values.added.forEach((value) => this.findOptionsByValue(value)?.highlightAsSelected());
    });
    this.options?.changes
      .pipe(
        startWith<QueryList<SelectOptionComponent<T>>>(this.options),
        switchMap((options) => merge(...options.map((option) => option.selected))),
        takeUntilDestroyed(this.destroyRef)
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

  private handleSelection(selectedOption: SelectOptionComponent<T>): void {
    if (selectedOption.value) {
      this.selectionModel.toggle(selectedOption.value);
      this.selectionChanged.emit(selectedOption.value);
    }
    this.close();
  }

  private highlightOption(value: SelectValue<T>): void {
    this.findOptionsByValue(value)?.highlightAsSelected();
  }

  private findOptionsByValue(value: SelectValue<T>): SelectOptionComponent<T> | undefined {
    return this.options && this.options.find((option) => this.compareWith(option.value, value));
  }
}
