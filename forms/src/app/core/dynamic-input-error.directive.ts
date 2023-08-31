/* eslint-disable @angular-eslint/directive-selector */
import { ComponentRef, DestroyRef, Directive, OnInit, ViewContainerRef, inject } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';
import { filter, skip, startWith } from 'rxjs';
import { InputErrorComponent } from './input-error/input-error.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[ngModel],[formControl],[formControlName]',
  standalone: true,
})
export class DynamicInputErrorDirective implements OnInit {
  private destroyRef = inject(DestroyRef);
  private containerRef = inject(ViewContainerRef);
  private componentRef: ComponentRef<InputErrorComponent> | null = null;
  ngControl = inject(NgControl, { self: true });

  ngOnInit(): void {
    this.ngControl.control?.statusChanges
      .pipe(
        startWith(this.ngControl.status),
        skip(this.ngControl instanceof NgModel ? 1 : 0),
        filter((status) => status === 'VALID' || status === 'INVALID'),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        console.log(this.containerRef);
        if (this.ngControl.errors) {
          if (!this.componentRef) {
            this.componentRef = this.containerRef.createComponent(InputErrorComponent);
          }
          this.componentRef.setInput('errors', this.ngControl.errors);
        } else {
          this.componentRef?.destroy();
          this.componentRef = null;
        }
      });
  }
}
