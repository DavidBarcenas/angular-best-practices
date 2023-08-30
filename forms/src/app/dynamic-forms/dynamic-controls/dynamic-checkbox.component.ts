import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDynamicControl, dynamicControlProvider } from './base-dynamic-control';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-checkbox',
  standalone: true,
  viewProviders: [dynamicControlProvider],
  imports: [CommonModule, ReactiveFormsModule],
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
