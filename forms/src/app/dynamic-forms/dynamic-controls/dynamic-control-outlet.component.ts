import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicControlResolver } from '../dynamic-control-resolver.service';
import { ControlInjectorPipe } from '../control-injector.pipe';
import { DynamicControl } from '../dynamic-forms.model';

@Component({
  selector: 'app-dynamic-control-outlet',
  standalone: true,
  template: `
    <ng-container
      *ngIf="control"
      [ngComponentOutlet]="controlResolver.resolve(control.controlType) | async"
      [ngComponentOutletInjector]="controlKey | controlInjector : control"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ControlInjectorPipe],
})
export class DynamicControlOutletComponent {
  @Input()
  control: DynamicControl | undefined;

  @Input()
  controlKey = '';

  protected controlResolver = inject(DynamicControlResolver);
}
