import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent implements OnInit {
  @Input() entity = '';
  @Output() confirm = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  @HostListener('click')
  openDialog() {
    this.dialog
      .open(ConfirmModalComponent, {
        data: {
          entity: this.entity,
        },
      })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.confirm.emit();
        }
      });
  }
}
