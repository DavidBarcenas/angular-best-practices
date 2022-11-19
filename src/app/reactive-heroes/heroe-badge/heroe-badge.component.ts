import { Component, Input } from '@angular/core';
import { Hero } from '../heroe';

export const Layouts = {
  portrait: 'portrait',
  standard: 'standard',
  landscape: 'landscape',
};

export const Sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge',
};

@Component({
  selector: 'app-heroe-badge',
  templateUrl: './heroe-badge.component.html',
  styleUrls: ['./heroe-badge.component.scss'],
  host: {
    '[class.loaded]': 'loaded',
  },
})
export class HeroeBadgeComponent {
  @Input() hero: Hero | null = null;
  @Input() layout = Layouts.standard;
  @Input() size = Sizes.medium;
  loaded = false;
}
