import { Directive, ElementRef, HostListener, inject, Renderer2, SecurityContext } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

const DEFAULT_REVIEW_TEMPLATE = `
  <h2 data-placeholder='Title...'></h2>
  <p data-placeholder='Describe your experience...'></p>
`;

@Directive({
  selector:
    '[appEditableContent],[formControlName][contenteditable],[formControl][contenteditable],[ngModel][contenteditable]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: EditableContentDirective,
      multi: true,
    },
  ],
})
export class EditableContentDirective implements ControlValueAccessor {
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);
  private sanitizer = inject(DomSanitizer);

  onChange: (value: string) => void = (): void => {};
  onTouched: () => void = (): void => {};

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const value = (event.target as HTMLElement).innerHTML;
    this.onChange(value);
  }

  @HostListener('blur')
  onBlur(): void {
    this.onTouched();
  }

  writeValue(value: string): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      this.sanitizer.sanitize(SecurityContext.HTML, value) || DEFAULT_REVIEW_TEMPLATE
    );
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.renderer.setProperty(this.elementRef.nativeElement, 'contentEditable', !isDisabled);
  }
}
