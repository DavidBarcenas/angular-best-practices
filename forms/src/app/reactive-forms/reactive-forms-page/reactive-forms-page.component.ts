import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-forms-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reactive-forms-page.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormsPageComponent {

}
