import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDynamicControl, dynamicControlProvider, sharedDynamicControlDeps } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-select',
  standalone: true,
  viewProviders: [dynamicControlProvider],
  imports: [...sharedDynamicControlDeps],
  template: `
    <label [for]="control.controlKey" class="form-label">{{ control.config.label }}</label>
    <select
      [formControlName]="control.controlKey"
      class="form-input"
      [id]="control.controlKey"
      [value]="control.config.value"
    >
      <option *ngFor="let option of control.config.options" [value]="option.value">{{ option.label }}</option>
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSelectComponent extends BaseDynamicControl {}
