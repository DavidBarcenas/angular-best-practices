import {ChangeDetectorRef, ElementRef} from '@angular/core';

import {AutofocusDirective} from './autofocus.directive';

class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}

const cdRefMock: ChangeDetectorRef = {
  markForCheck: function (): void {
    throw new Error('Function not implemented.');
  },
  detach: function (): void {
    throw new Error('Function not implemented.');
  },
  detectChanges: function (): void {
    throw new Error('Function not implemented.');
  },
  checkNoChanges: function (): void {
    throw new Error('Function not implemented.');
  },
  reattach: function (): void {
    throw new Error('Function not implemented.');
  },
};

describe('AutofocusDirective', () => {
  it('should create an instance', () => {
    const directive = new AutofocusDirective(new MockElementRef(), cdRefMock);
    expect(directive).toBeTruthy();
  });
});
