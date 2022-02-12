import {Component, Input, OnDestroy, Renderer2} from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnDestroy {
  @Input() show = false;

  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'loading-overlay');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'loading-overlay');
  }
}
