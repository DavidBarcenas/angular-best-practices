import {Component} from '@angular/core';
import {LoadingService} from '@shared/services/loading/loading.service';
import {delay} from 'rxjs';

const DELAY_TIME = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showLoading = false;

  constructor(private loadingService: LoadingService) {
    this.initLoading();
  }

  private initLoading(): void {
    this.loadingService.loading$
      .pipe(delay(DELAY_TIME))
      .subscribe(loading => (this.showLoading = loading));
  }
}
