import { Component, Input } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

export interface Pill {
  label: string;
}

@Component({
  selector: 'app-pills',
  templateUrl: './pills.component.html',
  styleUrls: ['./pills.component.scss'],
  standalone: true,
  imports: [NgFor, NgClass]
})
export class PillsComponent {
  @Input() pills: Pill[] = [];
  selectedPill: Pill | undefined;

  togglePill(pill: Pill): void {
    this.selectedPill = pill;
  }
}
