import { Component, Input } from '@angular/core';

export interface Pill {
  label: string;
}

@Component({
  selector: 'app-pills',
  templateUrl: './pills.component.html',
  styleUrls: ['./pills.component.scss']
})
export class PillsComponent {
  @Input() pills: Pill[] = [];
  selectedPill: Pill | undefined;

  togglePill(pill: Pill): void {
    this.selectedPill = pill;
  }
}
