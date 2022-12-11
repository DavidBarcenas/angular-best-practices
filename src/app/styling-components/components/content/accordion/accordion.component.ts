import { Component, ContentChildren, QueryList } from '@angular/core';
import { AccordionPaneComponent } from './accordion-pane.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
  @ContentChildren(AccordionPaneComponent)
  items: QueryList<AccordionPaneComponent> | undefined;

  activeIndex: number | null = null;

  selectItem(index: number): void {
    this.activeIndex = this.activeIndex != index ? index : null;
  }
}
