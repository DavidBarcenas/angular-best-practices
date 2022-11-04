import { Component, Directive } from '@angular/core';

@Directive({ selector: 'app-tooltip-message' })
export class TooltipMessageDirective {}

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {}
