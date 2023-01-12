import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './custom-operators.component.html',
  styleUrls: ['./custom-operators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomOperatorsComponent {
  buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}
