/* eslint-disable @angular-eslint/directive-selector */
import {
  ComponentRef,
  DestroyRef,
  Directive,
  ElementRef,
  Input,
  OnInit,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { ControlContainer, FormGroupDirective, NgControl, NgForm, NgModel } from '@angular/forms';
import { EMPTY, fromEvent, iif, merge, skip, startWith } from 'rxjs';
import { InputErrorComponent } from './input-error/input-error.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorStateMatcher } from './input-error/error-state-matcher.service';

@Directive({
  selector: `
    [ngModel]:not([withoutValidationErrors]),
    [formControl]:not([withoutValidationErrors]),
    [formControlName]:not([withoutValidationErrors]),
    [formGroupName]:not([withoutValidationErrors]),
    [ngModelGroup]:not([withoutValidationErrors])`,
  standalone: true,
})
export class DynamicInputErrorDirective implements OnInit {
  private destroyRef = inject(DestroyRef);
  private elRef = inject(ElementRef);
  private parentContainer = inject(ControlContainer, { optional: true });
  private componentRef: ComponentRef<InputErrorComponent> | null = null;

  @Input()
  errorStateMatcher = inject(ErrorStateMatcher);

  @Input()
  containerRef = inject(ViewContainerRef);

  ngControl = inject(NgControl, { self: true, optional: true }) || inject(ControlContainer, { self: true });

  get form(): NgForm | FormGroupDirective | null {
    return this.parentContainer?.formDirective as NgForm | FormGroupDirective | null;
  }

  ngOnInit(): void {
    queueMicrotask(() => {
      if (!this.ngControl.control) {
        throw Error(`No control model for ${this.ngControl.name} control`);
      }
      merge(
        this.ngControl.control.statusChanges,
        fromEvent(this.elRef.nativeElement, 'blur'),
        iif(() => !!this.form, this.form!.ngSubmit, EMPTY)
      )
        .pipe(
          startWith(this.ngControl.status),
          skip(this.ngControl instanceof NgModel ? 1 : 0),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          if (this.errorStateMatcher.hasError(this.ngControl.control, this.form)) {
            if (!this.componentRef) {
              this.componentRef = this.containerRef.createComponent(InputErrorComponent);
              this.componentRef.changeDetectorRef.markForCheck();
            }
            this.componentRef.setInput('errors', this.ngControl.errors);
          } else {
            this.componentRef?.destroy();
            this.componentRef = null;
          }
        });
    });
  }
}
