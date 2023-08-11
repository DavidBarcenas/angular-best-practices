import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkOverlayOrigin, OverlayModule } from '@angular/cdk/overlay';
import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { SelectOptionComponent } from '../select-option/select-option.component';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './custom-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('dropdown', [
      state('void', style({ opacity: 0, transform: 'scale(1, 0.8)' })),
      state('*', style({ opacity: 1, transform: 'scale(1,1)' })),
      transition(':enter', [animate('120ms cubic-bezier(0, 0, 0.2, 1)')]),
      transition(':leave', [animate('100ms linear')]),
    ]),
  ],
  styles: [
    `
      :host.opened {
        pointer-events: none;
      }
    `,
  ],
})
export class CustomSelectComponent implements AfterContentInit, AfterViewInit {
  @ViewChild('trigger')
  parent: CdkOverlayOrigin | undefined;

  @Input()
  label = '';

  @Input()
  value: string | null = null;

  @Output()
  readonly opened = new EventEmitter<void>();

  @Output()
  readonly closed = new EventEmitter<void>();

  @HostListener('click')
  open(): void {
    this.isOpen = true;
  }

  close(): void {
    this.isOpen = false;
  }

  @ContentChildren(SelectOptionComponent, { descendants: true })
  options: QueryList<SelectOptionComponent> | undefined;

  @HostBinding('class.opened')
  isOpen = false;

  defaultWidth = 'auto';

  ngAfterViewInit(): void {
    this.defaultWidth = this.parent?.elementRef.nativeElement.getBoundingClientRect().width + 'px';
  }

  ngAfterContentInit() {
    console.log('[ngAfterContentInit] ', this.options);
  }

  onPanelAnimationDone({ fromState, toState }: AnimationEvent): void {
    if (fromState === 'void' && toState === null && this.isOpen) {
      this.opened.emit();
    }
    if (fromState === null && toState === 'void' && !this.isOpen) {
      this.closed.emit();
    }
  }
}
