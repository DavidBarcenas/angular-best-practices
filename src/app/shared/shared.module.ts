import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModules } from './angular-material';
import { Components } from './components';

@NgModule({
  declarations: [...Components],
  imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ...MaterialModules,
    ...Components,
  ],
})
export class SharedModule {}
