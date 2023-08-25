import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTROL_DATA } from '../control-data.token';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule],
  template: '<input [type]="control.config.controlType" [id]="control.controlKey" class="form-input" />',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicInputComponent {
  control = inject(CONTROL_DATA);
}
