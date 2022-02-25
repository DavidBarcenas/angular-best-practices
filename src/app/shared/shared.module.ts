import {CommonModule} from '@angular/common';
import {MaterialModules} from './angular-material';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {components} from './components';
import {directives} from './directives';
import { FlatObjectPipe } from './pipes/flat-object.pipe';

@NgModule({
  declarations: [...components, ...directives, FlatObjectPipe],
  imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
  exports: [CommonModule, ReactiveFormsModule, ...MaterialModules, ...components, ...directives],
})
export class SharedModule {}
