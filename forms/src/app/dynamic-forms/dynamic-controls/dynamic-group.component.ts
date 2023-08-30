import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseDynamicControl, compareFn, dynamicControlProvider } from './base-dynamic-control';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicControlOutletComponent } from './dynamic-control-outlet.component';

@Component({
  selector: 'app-dynamic-group',
  standalone: true,
  viewProviders: [dynamicControlProvider],
  template: `
    <fieldset [formGroupName]="control.controlKey">
      <legend class="text-blue-500 mb-2">{{ control.config.label }}</legend>
      <ng-container *ngFor="let control of control.config.controls | keyvalue : compareFn">
        <app-dynamic-control-outlet [controlKey]="control.key" [control]="control.value" />
      </ng-container>
    </fieldset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, DynamicControlOutletComponent],
})
export class DynamicGroupComponent extends BaseDynamicControl {
  @HostBinding('class') override hostClass = 'form-field-group';

  protected compareFn = compareFn;

  override formControl = new FormGroup({});
}
