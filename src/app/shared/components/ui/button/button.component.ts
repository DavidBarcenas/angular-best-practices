import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() text = 'Add';
  @Input() icon = 'add';
  @Input() mode: 'light' | 'normal' = 'normal';
  @Input() type: 'submit' | 'button' = 'button';
}
