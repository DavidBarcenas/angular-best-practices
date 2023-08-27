import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseDynamicControl } from './base-dynamic-input';

@Component({
  selector: 'app-dynamic-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <ng-container [formGroup]="formGroup">
      <input
        [formControlName]="control.controlKey"
        [type]="control.config.controlType"
        [id]="control.controlKey"
        class="form-input"
      />
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicInputComponent extends BaseDynamicControl {}
