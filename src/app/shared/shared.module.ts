import {CommonModule} from '@angular/common';
import {MaterialModules} from './angular-material';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {components} from './components';
import {directives} from './directives';

@NgModule({
  declarations: [...components, ...directives],
  imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
  exports: [CommonModule, ReactiveFormsModule, ...MaterialModules, ...components, ...directives],
})
export class SharedModule {}
