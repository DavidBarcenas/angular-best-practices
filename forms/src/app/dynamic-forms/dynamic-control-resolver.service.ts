import { Injectable, Type } from '@angular/core';
import { DynamicControl } from './dynamic-forms.model';
import { DynamicInputComponent } from './dynamic-controls/dynamic-input.component';
import { DynamicSelectComponent } from './dynamic-controls/dynamic-select.component';
import { DynamicCheckboxComponent } from './dynamic-controls/dynamic-checkbox.component';

type DynamicConstrolsMap = {
  [T in DynamicControl['controlType']]: Type<any>;
};

@Injectable({
  providedIn: 'root',
})
export class DynamicControlResolver {
  private controlComponents: DynamicConstrolsMap = {
    input: DynamicInputComponent,
    select: DynamicSelectComponent,
    checkbox: DynamicCheckboxComponent,
  };

  resolve(controlType: keyof DynamicConstrolsMap) {
    return this.controlComponents[controlType];
  }
}
