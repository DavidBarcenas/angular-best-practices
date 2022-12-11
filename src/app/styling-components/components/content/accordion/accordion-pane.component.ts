import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-accordion-pane',
  template: `
    <ng-template>
      <div class="pane">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  styles: ['.pane { padding: 0 1em;}']
})
export class AccordionPaneComponent {
  @ViewChild(TemplateRef, { static: true })
  template: TemplateRef<unknown> | null = null;
  @Input() title: string | undefined;
}
