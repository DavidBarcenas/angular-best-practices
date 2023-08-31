import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDynamicControl, dynamicControlProvider, sharedDynamicControlDeps } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-checkbox',
  standalone: true,
  viewProviders: [dynamicControlProvider],
  imports: [...sharedDynamicControlDeps],
  template: `
    <input
      type="checkbox"
      [formControlName]="control.controlKey"
      [checked]="control.config.value"
      [id]="control.controlKey"
    />
    <label [for]="control.controlKey" class="text-sm inline-block align-text-bottom ml-2">{{
      control.config.label
    }}</label>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicCheckboxComponent extends BaseDynamicControl {}
