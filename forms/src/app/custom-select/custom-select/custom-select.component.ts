import {
  AfterViewInit,
  Attribute,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DestroyRef,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
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
import { merge, startWith, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type SelectValue<T> = T | T[] | null;

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './custom-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomSelectComponent,
      multi: true,
    },
  ],
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
      :host {
        &.select-panel-open {
          pointer-events: none;
          position: relative;
          z-index: 1001;
        }

        &.disabled {
          pointer-events: none;
          opacity: 0.5;
        }
      }
    `,
  ],
})
export class CustomSelectComponent<T> implements OnChanges, AfterViewInit, ControlValueAccessor {
  @ViewChild('trigger')
  parent: CdkOverlayOrigin | undefined;

  @ViewChild('searchInput')
  searchInputEl: ElementRef<HTMLInputElement> | undefined;

  @Input()
  label = '';

  @Input({ transform: booleanAttribute })
  searchable = false;

  @Input({ transform: booleanAttribute })
  @HostBinding('class.disabled')
  disabled = false;

  @Input()
  displayWith: ((value: T) => string | number) | null = null;

  @Input()
  compareWith: (value1: T | null, value2: T | null) => boolean = (value1, value2) => value1 === value2;

  @Input()
  set value(value: SelectValue<T>) {
    this.setupValue(value);
    this.onChange(this.value);
  }

  get value() {
    if (this.selectionModel.isEmpty()) {
      return null;
    }
    if (this.selectionModel.isMultipleSelection()) {
      return this.selectionModel.selected;
    }
    return this.selectionModel.selected[0];
  }

  private selectionModel = new SelectionModel<T>(coerceBooleanProperty(this.multiple));

  @Output()
  readonly opened = new EventEmitter<void>();

  @Output()
  readonly closed = new EventEmitter<void>();

  @Output()
  readonly searchChanged = new EventEmitter<string>();

  @Output()
  readonly selectionChanged = new EventEmitter<SelectValue<T>>();

  @HostListener('click')
  open(): void {
    if (this.disabled) {
      return;
    }
    this.isOpen = true;
    if (this.searchable) {
      setTimeout(() => {
        this.searchInputEl?.nativeElement.focus();
      }, 0);
    }
  }

  close(): void {
    this.isOpen = false;
  }

  @ContentChildren(SelectOptionComponent, { descendants: true })
  options: QueryList<SelectOptionComponent<T>> | undefined;

  @HostBinding('class.select-panel-open')
  isOpen = false;

  defaultWidth = 'auto';
  private optionMap = new Map<SelectValue<T>, SelectOptionComponent<T>>();
  protected onChange: (newValue: SelectValue<T>) => void = () => {};

  protected get displayValue() {
    if (this.displayWith && this.value) {
      if (Array.isArray(this.value)) {
        return this.value.map(this.displayWith);
      }
      return this.displayWith(this.value);
    }
    return this.value;
  }

  constructor(private destroyRef: DestroyRef, @Attribute('multiple') private multiple: string | null) {}

  writeValue(obj: SelectValue<T>): void {
    this.setupValue(obj);
  }

  registerOnChange(fn: (newValue: SelectValue<T>) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['compareWith']) {
      this.selectionModel.compareWith = changes['compareWith'].currentValue;
      this.highlightOption();
    }
  }

  ngAfterViewInit(): void {
    this.defaultWidth = this.parent?.elementRef.nativeElement.getBoundingClientRect().width + 'px';
    this.selectionModel.changed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((values) => {
      values.removed.forEach((value) => this.optionMap.get(value)?.deselect());
      values.added.forEach((value) => this.optionMap.get(value)?.highlightAsSelected());
    });
    this.options?.changes
      .pipe(
        startWith<QueryList<SelectOptionComponent<T>>>(this.options),
        tap(() => this.refreshOptionMap()),
        tap(() => queueMicrotask(() => this.highlightOption())),
        switchMap((options) => merge(...options.map((option) => option.selected))),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((selectedOption) => this.handleSelection(selectedOption));
  }

  clearSelection(e: Event) {
    e.stopPropagation();
    if (this.disabled) {
      return;
    }
    this.selectionModel.clear();
    this.selectionChanged.emit(this.value);
    this.onChange(this.value);
  }

  protected onHandleSearch(e: Event): void {
    this.searchChanged.emit((e.target as HTMLInputElement).value);
  }

  protected onPanelAnimationDone({ fromState, toState }: AnimationEvent): void {
    if (fromState === 'void' && toState === null && this.isOpen) {
      this.opened.emit();
    }
    if (fromState === null && toState === 'void' && !this.isOpen) {
      this.closed.emit();
    }
  }

  private setupValue(value: SelectValue<T>) {
    this.selectionModel.clear();
    if (value) {
      Array.isArray(value) ? this.selectionModel.select(...value) : this.selectionModel.select(value);
    }
  }

  private handleSelection(selectedOption: SelectOptionComponent<T>): void {
    if (this.disabled) {
      return;
    }
    if (selectedOption.value) {
      this.selectionModel.toggle(selectedOption.value);
      this.selectionChanged.emit(this.value);
      this.onChange(this.value);
    }
    if (!this.selectionModel.isMultipleSelection()) {
      this.close();
    }
  }

  private refreshOptionMap(): void {
    this.optionMap.clear();
    this.options?.forEach((option) => this.optionMap.set(option.value, option));
  }

  private highlightOption(): void {
    const valuesWithUpdateReferences = this.selectionModel.selected.map((value) => {
      const correspondingOption = this.findOptionsByValue(value);
      return correspondingOption?.value ? correspondingOption.value : value;
    });
    this.selectionModel.clear();
    this.selectionModel.select(...valuesWithUpdateReferences);
  }

  private findOptionsByValue(value: T | null): SelectOptionComponent<T> | undefined {
    if (this.optionMap.has(value)) {
      return this.optionMap.get(value);
    }
    return this.options && this.options.find((option) => this.compareWith(option.value, value));
  }
}
