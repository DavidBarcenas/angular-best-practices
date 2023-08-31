import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  BaseDynamicControl,
  compareFn,
  dynamicControlProvider,
  sharedDynamicControlDeps,
} from './base-dynamic-control';
import { FormGroup } from '@angular/forms';
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
  imports: [...sharedDynamicControlDeps, DynamicControlOutletComponent],
})
export class DynamicGroupComponent extends BaseDynamicControl {
  @HostBinding('class') override hostClass = 'form-field-group';

  protected compareFn = compareFn;

  override formControl = new FormGroup({});
}
