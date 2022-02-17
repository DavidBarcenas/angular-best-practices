import {Component, ViewChild} from '@angular/core';

import {LoadingService} from '@shared/services/loading/loading.service';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {delay} from 'rxjs';

const DELAY_TIME = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showLoading = false;
  @ViewChild('deleteSwal')
  private readonly deleteSwal!: SwalComponent;

  constructor(private loadingService: LoadingService) {
    this.initLoading();
  }

  private initLoading(): void {
    this.loadingService.loading$
      .pipe(delay(DELAY_TIME))
      .subscribe(loading => (this.showLoading = loading));
  }

  openSwal() {
    this.deleteSwal.fire();
  }
}
