import { Component, Directive } from '@angular/core';

@Directive({
  selector: 'app-tooltip-message',
  standalone: true
})
export class TooltipMessageDirective {}

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  standalone: true
})
export class TooltipComponent {}
