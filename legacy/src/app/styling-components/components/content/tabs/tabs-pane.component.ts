import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs-pane',
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .pane {
        border: solid 1px #ccc;
        border-top: none;
        overflow: hidden;
        padding: 1em 1em 0;
      }
    `
  ],
  standalone: true
})
export class TabsPaneComponent {
  @Input() title: string | undefined;
  @Input() active = false;
}
