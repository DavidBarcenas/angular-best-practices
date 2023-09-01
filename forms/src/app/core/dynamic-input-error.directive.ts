/* eslint-disable @angular-eslint/directive-selector */
import { ComponentRef, DestroyRef, Directive, ElementRef, OnInit, ViewContainerRef, inject } from '@angular/core';
import { ControlContainer, FormGroupDirective, NgControl, NgForm, NgModel } from '@angular/forms';
import { EMPTY, fromEvent, iif, merge, skip, startWith } from 'rxjs';
import { InputErrorComponent } from './input-error/input-error.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[ngModel],[formControl],[formControlName]',
  standalone: true,
})
export class DynamicInputErrorDirective implements OnInit {
  private destroyRef = inject(DestroyRef);
  private containerRef = inject(ViewContainerRef);
  private elRef = inject(ElementRef);
  private parentContainer = inject(ControlContainer, { optional: true });
  private componentRef: ComponentRef<InputErrorComponent> | null = null;
  ngControl = inject(NgControl, { self: true });

  get form(): NgForm | FormGroupDirective | null {
    return this.parentContainer?.formDirective as NgForm | FormGroupDirective | null;
  }

  ngOnInit(): void {
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
        if (this.form?.submitted && this.ngControl.errors) {
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
  }
}
