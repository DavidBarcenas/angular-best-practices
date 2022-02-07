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
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

const MaterialModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatDialogModule,
];

@NgModule({
  declarations: [DeleteButtonComponent, ConfirmModalComponent],
  imports: [CommonModule, ReactiveFormsModule, ...MaterialModules],
  exports: [
    ReactiveFormsModule,
    DeleteButtonComponent,
    ConfirmModalComponent,
    ...MaterialModules,
  ],
})
export class SharedModule {}
