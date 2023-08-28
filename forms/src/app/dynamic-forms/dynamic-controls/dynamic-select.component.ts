import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseDynamicControl } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <ng-container [formGroup]="formGroup">
      <label [for]="control.controlKey" class="form-label">{{ control.config.label }}</label>
      <select
        [formControlName]="control.controlKey"
        class="form-input"
        [id]="control.controlKey"
        [value]="control.config.value"
      >
        <option *ngFor="let option of control.config.options" [value]="option.value">{{ option.label }}</option>
      </select>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSelectComponent extends BaseDynamicControl {}
