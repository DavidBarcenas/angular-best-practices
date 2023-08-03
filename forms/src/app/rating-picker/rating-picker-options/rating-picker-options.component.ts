import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null;

@Component({
  selector: 'app-rating-picker-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-picker-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RatingPickerOptionsComponent,
      multi: true,
    },
  ],
})
export class RatingPickerOptionsComponent implements OnChanges, ControlValueAccessor {
  @Input()
  value: RatingOptions = null;

  @Input()
  disabled = false;

  @Output()
  valueChange = new EventEmitter<RatingOptions>();

  @Input()
  @HostBinding('attr.tabIndex')
  tabIndex = 0;

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  private cd = inject(ChangeDetectorRef);
  onChange: (value: RatingOptions) => void = () => {};
  onTouched: () => void = () => {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.onChange(changes['value'].currentValue);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cd.markForCheck();
  }

  writeValue(value: RatingOptions): void {
    this.value = value;
    this.cd.markForCheck();
  }

  setRating(value: RatingOptions): void {
    if (!this.disabled) {
      this.value = value;
      this.onChange(this.value);
      this.onTouched();
      this.valueChange.emit(this.value);
    }
  }
}
