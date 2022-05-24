import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkFormTouchedDirective } from './directives/mark-form-touched.directive';
import { AutofocusDirective } from './directives/autofocus.directive';

@NgModule({
  declarations: [MarkFormTouchedDirective, AutofocusDirective],
  imports: [CommonModule],
})
export class SharedModule {}
