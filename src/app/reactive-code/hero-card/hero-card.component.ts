import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { NgIf } from '@angular/common';

export const Layouts = {
  portrait: 'portrait',
  standard: 'standard',
  landscape: 'landscape'
};

export const Sizes = {
  small: 'small',
  medium: 'medium',
  large: 'large',
  xlarge: 'xlarge'
};

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.loaded]': 'loaded' },
  standalone: true,
  imports: [NgIf]
})
export class HeroCardComponent implements OnInit {
  @Input() hero: Hero | null = null;
  @Input() layout = Layouts.standard;
  @Input() size = Sizes.large;
  heroImage: string | null = null;
  loaded = false;

  ngOnInit() {
    this.heroImage =
      this.hero?.thumbnail.path +
      '/' +
      this.layout +
      '_' +
      this.size +
      '.' +
      this.hero?.thumbnail.extension;
  }
}
