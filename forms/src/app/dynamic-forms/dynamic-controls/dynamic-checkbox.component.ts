import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseDynamicControl, dynamicControlProvider, sharedDynamicControlDeps } from './base-dynamic-control';
import { ValidatorMessageContainer } from 'src/app/core/input-error/validator-message-container.directive';

@Component({
  selector: 'app-dynamic-checkbox',
  standalone: true,
  viewProviders: [dynamicControlProvider],
  imports: [...sharedDynamicControlDeps, ValidatorMessageContainer],
  template: `
    <div>
      <input
        type="checkbox"
        [formControlName]="control.controlKey"
        [containerRef]="containerDir.container"
        [checked]="control.config.value"
        [id]="control.controlKey"
      />
      <label [for]="control.controlKey" class="text-sm inline-block align-text-bottom ml-2">{{
        control.config.label
      }}</label>
    </div>
    <ng-container validatorMessageContainer #containerDir="validatorMessageContainer" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicCheckboxComponent extends BaseDynamicControl {}
