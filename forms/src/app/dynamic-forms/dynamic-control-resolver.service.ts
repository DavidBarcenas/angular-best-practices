import { Injectable, Type } from '@angular/core';
import { DynamicControl } from './dynamic-forms.model';
import { DynamicInputComponent } from './dynamic-controls/dynamic-input.component';
import { DynamicSelectComponent } from './dynamic-controls/dynamic-select.component';

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
  };

  resolve(controlType: keyof DynamicConstrolsMap) {
    return this.controlComponents[controlType];
  }
}
