import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './custom-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSelectComponent {
  @Input()
  label = '';

  @Input()
  value: string | null = null;

  @HostListener('click')
  open(): void {
    this.isOpen = true;
  }

  isOpen = false;

  close(): void {
    this.isOpen = false;
  }
}
