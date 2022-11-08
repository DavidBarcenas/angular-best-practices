import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveDevComponent } from './reactive-dev.component';
import { ReactiveDevRoutingModule } from './reactive-dev.routing';

@NgModule({
  declarations: [ReactiveDevComponent],
  imports: [CommonModule, ReactiveDevRoutingModule],
})
export class ReactiveDevModule {}
