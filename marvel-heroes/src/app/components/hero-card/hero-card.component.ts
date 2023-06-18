import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { layouts, sizes } from '../../utils/constants';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroCardComponent {
  @Input()
  set hero(value: Hero | undefined) {
    this.heroData = value;
    this.heroImage = `${this.hero?.thumbnail.path}/${this.layout}_${this.size}.${this.hero?.thumbnail.extension}`;
  }

  get hero(): Hero | undefined {
    return this.heroData;
  }

  @Input() layout = layouts.standard;
  @Input() size = sizes.large;

  private heroData: Hero | undefined = undefined;
  heroImage: string | undefined = undefined;
}
