import { Component } from '@angular/core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.scss']
})
export class HeroTableComponent {
  heroes$ = this.heroService.heroes$;
  constructor(private readonly heroService: HeroService) {}
}
