import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDynamicControl } from './base-dynamic-control';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicControlOutletComponent } from './dynamic-control-outlet.component';

@Component({
  selector: 'app-dynamic-group',
  standalone: true,
  template: `
    <ng-container [formGroup]="formGroup">
      <fieldset [formGroupName]="control.controlKey">
        <legend class="text-blue-500 mb-2">{{ control.config.label }}</legend>
        <ng-container *ngFor="let control of control.config.controls | keyvalue">
          <app-dynamic-control-outlet [controlKey]="control.key" [control]="control.value" />
        </ng-container>
      </fieldset>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, DynamicControlOutletComponent],
})
export class DynamicGroupComponent extends BaseDynamicControl {
  @HostBinding('class') override hostClass = 'form-field-group';
}
