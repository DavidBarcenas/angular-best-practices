import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailInputComponent } from './components/email-input/email-input.component';

const MaterialModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [EmailInputComponent],
  imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
  exports: [ReactiveFormsModule, ...MaterialModules, EmailInputComponent],
})
export class SharedModule {}
