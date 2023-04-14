import { Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html'
})
export class BtnComponent {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() type: 'button' | 'reset' | 'submit' = 'button';
  @Input() color: 'success' | 'primary' | 'danger' | 'light' | 'sky' = 'primary';

  protected readonly faSpinner = faSpinner;

  mapColors = {
    success: {
      'bg-success-400': true,
      'hover:bg-success-300': true,
      'focus:bg-success-400': true,
      'text-white': true
    },
    primary: {
      'bg-primary-700': true,
      'hover:bg-primary-800': true,
      'focus:ring-primary-300': true,
      'text-white': true
    },
    danger: {
      'bg-danger-700': true,
      'hover:bg-danger-800': true,
      'focus:ring-danger-300': true,
      'text-white': true
    },
    light: {
      'bg-gray-200': true,
      'hover:bg-gray-500': true,
      'focus:ring-gray-50': true,
      'text-gray-700': true
    },
    sky: {
      'bg-sky-700': true,
      'hover:bg-sky-800': true,
      'focus:ring-sky-300': true,
      'text-white': true
    }
  };

  get colors() {
    const colors = this.mapColors[this.color];
    if (colors) {
      return colors;
    }
    return {};
  }
}
