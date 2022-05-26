import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkFormTouchedDirective } from './directives/mark-form-touched.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { InputErrorComponent } from './components/input-error/input-error.component';

@NgModule({
  declarations: [MarkFormTouchedDirective, AutofocusDirective, InputErrorComponent],
  imports: [CommonModule],
})
export class SharedModule {}
