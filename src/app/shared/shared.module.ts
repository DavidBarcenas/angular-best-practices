import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { directives } from './directives';
import { components } from './components';

@NgModule({
  declarations: [directives, components],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, directives, components],
})
export class SharedModule {}
