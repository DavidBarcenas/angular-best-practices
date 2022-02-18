import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AlertData, AlertService} from '@shared/services/alert/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
  modalType = 'error';
  message = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: AlertData,
    private alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.modalType = this.data.type;

    if (!this.data.message) {
      this.message =
        this.modalType === 'error' ? 'Ocurrió un error' : 'Operación exitosa';
    } else {
      this.message = this.data.message;
    }
  }

  closeModal() {
    this.alertService.close();
  }
}
