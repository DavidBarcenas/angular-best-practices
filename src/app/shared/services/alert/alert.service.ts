import {AlertComponent} from '@shared/components/alert/alert.component';
import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(AlertComponent, {autoFocus: false});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
