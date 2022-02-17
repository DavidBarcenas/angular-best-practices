import {ChangeDetectorRef, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[autofocus]',
})
export class AutofocusDirective {
  constructor(private host: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.host.nativeElement.focus();
    this.cdr.detectChanges();
  }
}
