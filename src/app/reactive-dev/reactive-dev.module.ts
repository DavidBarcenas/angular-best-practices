import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveDevComponent } from './reactive-dev.component';
import { ReactiveDevRoutingModule } from './reactive-dev.routing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { UsersComponent } from './users/users.component';
import { UserResolver } from './users/user-resolver.service';

@NgModule({
  declarations: [ReactiveDevComponent, UsersComponent],
  imports: [
    CommonModule,
    ReactiveDevRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  providers: [UserResolver],
})
export class ReactiveDevModule {}
