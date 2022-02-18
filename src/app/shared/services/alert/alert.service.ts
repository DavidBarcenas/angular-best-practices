import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {AlertComponent} from '@shared/components/alert/alert.component';
import {Injectable} from '@angular/core';

export interface AlertData {
  message?: string;
  type: 'error' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private dialogRef!: MatDialogRef<AlertComponent>;

  constructor(public dialog: MatDialog) {}

  open(data: AlertData) {
    this.dialogRef = this.dialog.open(AlertComponent, {autoFocus: false, data});
  }

  close() {
    this.dialogRef.close();
  }
}
