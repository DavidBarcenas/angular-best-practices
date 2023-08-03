import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null;

@Component({
  selector: 'app-rating-picker-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-picker-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RatingPickerOptionsComponent {
  @Input()
  value: RatingOptions = null;
}
