import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tabs-pane',
  templateUrl: './tabs-pane.component.html',
  styleUrls: ['./tabs-pane.component.scss'],
})
export class TabsPaneComponent {
  @Input() title: string | undefined;
  @Input() active = false;
}
