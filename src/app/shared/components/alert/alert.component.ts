import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
  modalType = 'error';
  message = '';
  constructor() {}

  ngOnInit(): void {
    if (!this.message) {
      this.message =
        this.modalType === 'error' ? 'Ocurrió un error' : 'Operación exitosa';
    }
  }
}
