import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rating-picker-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-picker-page.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingPickerPageComponent {

}
