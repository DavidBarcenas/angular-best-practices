import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveDevComponent } from './reactive-dev.component';
import { ReactiveDevRoutingModule } from './reactive-dev.routing';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [ReactiveDevComponent, HomeComponent],
  imports: [CommonModule, ReactiveDevRoutingModule, MatIconModule, MatButtonModule],
})
export class ReactiveDevModule {}
