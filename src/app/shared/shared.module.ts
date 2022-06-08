import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { directives } from './directives';
import { components } from './components';
import { FormSubmitDirective } from './directives/form-submit.directive';

@NgModule({
  declarations: [directives, components, FormSubmitDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, directives, components],
})
export class SharedModule {}
