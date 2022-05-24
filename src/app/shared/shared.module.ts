import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkFormTouchedDirective } from './directives/mark-form-touched.directive';

@NgModule({
  declarations: [MarkFormTouchedDirective],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
