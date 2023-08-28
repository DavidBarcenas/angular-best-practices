import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseDynamicControl } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <ng-container [formGroup]="formGroup">
      <label [for]="control.controlKey" class="form-label">{{ control.config.label }}</label>
      <input
        [formControlName]="control.controlKey"
        [type]="control.config.type"
        [id]="control.controlKey"
        class="form-input"
      />
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicInputComponent extends BaseDynamicControl {}
